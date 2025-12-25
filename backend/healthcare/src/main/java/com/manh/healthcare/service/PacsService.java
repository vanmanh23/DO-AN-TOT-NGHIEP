package com.manh.healthcare.service;

import com.manh.healthcare.dtos.PacsUidResponse;
import org.dcm4che3.data.Tag;
import org.dcm4che3.io.DicomInputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.dcm4che3.data.Attributes;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.json.JSONObject;

@Service
public class PacsService {
    @Autowired
    private RestTemplate restTemplate;
    private static final String STOW_RS_URL = "http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs";
    public Map<String, String> uploadDicomFile(MultipartFile dicomFile, String newName, String newSex) throws IOException {

        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            DicomInputStream dis = new DicomInputStream(dicomFile.getInputStream());
            Attributes attrs = dis.readDataset(-1, -1);
            String patientID = attrs.getString(Tag.PatientID);
            System.out.println("patientID===========: "+ patientID);

            String boundary = "----Boundary" + System.currentTimeMillis();
            HttpPost postRequest = new HttpPost(STOW_RS_URL + "/studies");

            postRequest.setHeader("Content-Type",
                    "multipart/related; type=\"application/dicom\"; boundary=" + boundary);
            InputStream inputStream = dicomFile.getInputStream();

            MultipartEntityBuilder builder = MultipartEntityBuilder.create();
            builder.setBoundary(boundary);
            builder.setMimeSubtype("related");

            builder.addBinaryBody(
                    "dicomfile",
                    inputStream,
                    ContentType.create("application/dicom"),
                    dicomFile.getOriginalFilename()
            );
            postRequest.setEntity(builder.build());
            try (CloseableHttpResponse response = httpClient.execute(postRequest)) {
                int statusCode = response.getStatusLine().getStatusCode();
                String responseBody = EntityUtils.toString(response.getEntity());
                System.out.println("responseBody===========: "+ responseBody);
                if (statusCode >= 200 && statusCode < 300) {

                    // Trích xuất studyInstanceUID từ response nếu có
                    Map<String, String> studySeriesInstanceIdsFromXmlResponse = extractStudySeriesInstanceIdsFromXmlResponse(responseBody);
                    updatePatientInfo(patientID, newName, newSex);
                    if (studySeriesInstanceIdsFromXmlResponse == null) {
                        throw new IOException("No studyInstanceUID found in response");
                    }
//                    if (diagnoseRepository.existsByStudyId(studySeriesInstanceIdsFromXmlResponse.get("studyInstanceUID"))) {
//                        System.out.println("StudyInstanceUID already exists");
////                            throw new IOException("Dicom file already exists");
//                    }else {
//                        Diagnose diagnose = new Diagnose();
//                        diagnose.setStudyId(studySeriesInstanceIdsFromXmlResponse.get("studyInstanceUID"));
//                        diagnoseRepository.save(diagnose);
//                    }

                    return studySeriesInstanceIdsFromXmlResponse;
                } else {
                    throw new IOException("Upload failed. Status: " + statusCode + ". Response: " + responseBody);
                }
            }
        }
    }
    private Map<String, String> extractStudySeriesInstanceIdsFromXmlResponse(String responseBody) {
        try {
            // Regex to find studies/<UID>/series/<UID>/instances/<UID>
            Pattern pattern = Pattern.compile("rs/studies/([0-9.]+)/series/([0-9.]+)/instances/([0-9.]+)");
            Matcher matcher = pattern.matcher(responseBody);

            if (matcher.find()) {
                Map<String, String> ids = new HashMap<>();
                ids.put("studyInstanceUID", matcher.group(1));
                ids.put("seriesInstanceUID", matcher.group(2));
                ids.put("instanceUID", matcher.group(3));
                return ids;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

public void updatePatientInfo(String priorPatientID, String newName, String newSex) {
    try {
        // Tạo DICOM JSON object để update
        String dicomJson = String.format("""
            {
              "00100010": {
                "vr": "PN",
                "Value": [{"Alphabetic": "%s"}]
              },
              "00100020": {
               "vr": "LO",
                "Value": ["%s"] 
               },
              "00100040": {
                "vr": "CS",
                "Value": ["%s"]
              }
            }
            """, newName, priorPatientID, newSex);

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/dicom+json");  // ← THIẾU Ở CODE CŨ
        headers.set("Accept", "application/dicom+json");

        // Tạo HttpEntity với body                              // ← THIẾU Ở CODE CŨ
        HttpEntity<String> entity = new HttpEntity<>(dicomJson, headers);

        // Gọi API
        ResponseEntity<String> response = restTemplate.exchange(
                STOW_RS_URL + "/patients/" + priorPatientID,  // ← URL ĐÚNG
                HttpMethod.PUT,
                entity,
                String.class
        );

        // Xử lý response
        if (response.getStatusCode().is2xxSuccessful()) {
            System.out.println("Updated successfully: " + response.getBody());
        } else {
            System.err.println("Update failed: " + response.getStatusCode());
        }

    } catch (Exception e) {
        System.err.println("Error updating patient: " + e.getMessage());
        e.printStackTrace();
    }
}
    public int countStudies() {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Accept", "application/json");
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(
                    STOW_RS_URL + "/studies/count",
                    HttpMethod.GET,
                    entity,
                    String.class
            );
            String body = response.getBody();
            System.out.println("========body: " + body);
            if (response.getStatusCode() == HttpStatus.OK) {
                JSONObject json = new JSONObject(response.getBody());
                return json.getInt("count");
            }  else {
                throw new RuntimeException("Failed to fetch studies count: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error fetching studies count with DICOM tags: " + e.getMessage());
        }
    }
    public int sizeStudies() {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Accept", "application/json");
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(
                    STOW_RS_URL + "/studies/size",
                    HttpMethod.GET,
                    entity,
                    String.class
            );
            String body = response.getBody();
            System.out.println("========body: " + body);
            if (response.getStatusCode() == HttpStatus.OK) {
                JSONObject json = new JSONObject(response.getBody());
                return json.getInt("size");
            }  else {
                throw new RuntimeException("Failed to fetch studies size: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error fetching studies size with DICOM tags: " + e.getMessage());
        }
    }
}
