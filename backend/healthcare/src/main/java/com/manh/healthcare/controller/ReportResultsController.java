package com.manh.healthcare.controller;

import com.manh.healthcare.dtos.BaseResponse;
import com.manh.healthcare.dtos.ReportResultsRequestDTO;
import com.manh.healthcare.dtos.ReportResultsResponseDTO;
import com.manh.healthcare.service.ReportResultsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/report-results")
public class ReportResultsController {
    @Autowired
    private ReportResultsService reportResultsService;

    @PostMapping
    public ResponseEntity<BaseResponse> createReportResult(@RequestBody ReportResultsRequestDTO dto) throws IOException {
        ReportResultsResponseDTO created = reportResultsService.createReportResult(dto);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("report-results.success.create", created);
        return ResponseEntity.status(HttpStatus.CREATED).body(baseResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateReportResult(
            @PathVariable String id,
            @RequestBody ReportResultsRequestDTO dto) throws IOException {
        ReportResultsResponseDTO updated = reportResultsService.updateReportResult(id, dto);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("report-results.success.updated", updated);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getReportResultById(@PathVariable String id) {
        ReportResultsResponseDTO dto = reportResultsService.getReportResultById(id);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("report-results.success.findById", dto);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<BaseResponse> getReportResultByOrderId(@PathVariable String orderId) {
        ReportResultsResponseDTO dto = reportResultsService.getReportResultByOrderId(orderId);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("report-results.success.findByOrderId", dto);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @GetMapping
    public ResponseEntity<BaseResponse> getAllReportResults() {
        List<ReportResultsResponseDTO> results = reportResultsService.getAllReportResults();
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("report-results.success.findAll", results);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReportResult(@PathVariable String id) {
        reportResultsService.deleteReportResult(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/generate_pdf/{id}")
    public ResponseEntity<ByteArrayResource> downloadPdf(@PathVariable String id) {
        ReportResultsResponseDTO report = reportResultsService.getReportResultByOrderId(id);

        byte[] data = report.getPdf_report();

        // 3. Đóng gói vào ByteArrayResource để trả về
        ByteArrayResource resource = new ByteArrayResource(data);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=report.pdf")
                .body(resource);
    }
}
