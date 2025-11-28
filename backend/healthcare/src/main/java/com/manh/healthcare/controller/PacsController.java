package com.manh.healthcare.controller;

import com.manh.healthcare.dtos.BaseResponse;
import com.manh.healthcare.dtos.PacsUidResponse;
import com.manh.healthcare.service.PacsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/api/pacsdcm")
public class PacsController {

    @Autowired
    private PacsService pacsService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadDicom(@RequestParam("file") MultipartFile[] file,
                                         @RequestParam("new_name") String newName,
                                         @RequestParam("sex") String sex) {
        ArrayList<Map<String, String>> listRespone = new ArrayList<Map<String, String> >();
        try {
            for (MultipartFile multipartFile : file) {
                Map<String, String>  respon = pacsService.uploadDicomFile(multipartFile, newName, sex);
                listRespone.add(respon);
            }
            BaseResponse baseResponse = BaseResponse.createSuccessResponse("pacsdcm.success.update", listRespone);
            return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
//            return ResponseEntity.ok(listRespone.toString());
//            return ResponseEntity.ok("update dicom file successfully!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Upload failed: " + e.getMessage());
        }

//        try {
//            PacsUidResponse respon = pacsService.uploadDicomFile(file, newName, sex);
//            BaseResponse baseResponse = BaseResponse.createSuccessResponse("pacsdcm.success.update", respon);
//            return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
////            return ResponseEntity.ok("update dicom file successfully!");
//        } catch (Exception e) {
//            return ResponseEntity.internalServerError().body("Upload failed: " + e.getMessage());
//        }

    }
}
