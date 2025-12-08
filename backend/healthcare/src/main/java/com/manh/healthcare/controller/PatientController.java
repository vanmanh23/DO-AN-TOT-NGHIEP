package com.manh.healthcare.controller;

import com.manh.healthcare.dtos.BaseResponse;
import com.manh.healthcare.dtos.PatientDTO;
import com.manh.healthcare.dtos.PatientRequestDTO;
import com.manh.healthcare.dtos.PatientResponseDTO;
import com.manh.healthcare.entity.Patient;
import com.manh.healthcare.service.PatientService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/patients")
public class PatientController {
    @Autowired
    private PatientService patientService;

    @PostMapping
    public ResponseEntity<BaseResponse> createPatient(@Valid @RequestBody PatientRequestDTO request) {
        Patient patient = patientService.patientAdmission(request);
        BaseResponse response = BaseResponse.createSuccessResponse("patient.success.create", patient);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * GET /api/patients - Lấy tất cả bệnh nhân (đầy đủ)
     */
    @GetMapping
    public ResponseEntity<BaseResponse> getAllPatients() {
        List<PatientResponseDTO> patients = patientService.getAllPatients();
        BaseResponse response = BaseResponse.createSuccessResponse("patient.success.getAll", patients);
        return ResponseEntity.status(200).body(response);
    }


    /**
     * GET /api/patients/{id} - Lấy bệnh nhân theo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getPatientById(@PathVariable String id) {
        PatientDTO patient = patientService.getPatientById(id);
        BaseResponse response = BaseResponse.createSuccessResponse("patient.success.findById", patient);
        return ResponseEntity.status(200).body(response);
    }

    /**
     * PUT /api/patients/{id} - Cập nhật bệnh nhân
     */
    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updatePatient(
            @PathVariable String id,
            @Valid @RequestBody PatientRequestDTO request) {
        Patient patientUpdated = patientService.updatePatient(id, request);
        BaseResponse response = BaseResponse.createSuccessResponse("patient.success.update", patientUpdated);
        return ResponseEntity.status(200).body(response);
    }

    /**
     * DELETE /api/patients/{id} - Xóa bệnh nhân
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deletePatient(@PathVariable String id) {
        patientService.deletePatient(id);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("order.success.delete");
        return ResponseEntity.status(200).body(baseResponse);
    }

    /**
     * GET /api/patients/search?name=... - Tìm kiếm theo tên
     */
    @GetMapping("/search")
    public ResponseEntity<BaseResponse> searchByName(@RequestParam String name) {
        List<Patient> patients = patientService.searchByName(name);
        BaseResponse response = BaseResponse.createSuccessResponse("patient.success.search", patients);
        return ResponseEntity.status(200).body(response);
    }

    /**
     * GET /api/patients/search/phone?number=... - Tìm kiếm theo SĐT
     */
    @GetMapping("/search/phone")
    public ResponseEntity<BaseResponse> searchByPhone(@RequestParam String number) {
        Patient patients = patientService.searchByPhoneNumber(number);
        BaseResponse response = BaseResponse.createSuccessResponse("patient.success.search_by_phone", patients);
        return ResponseEntity.status(200).body(response);
    }

    /**
     * GET /api/patients/count - Đếm tổng số bệnh nhân
     */
    @GetMapping("/count")
    public ResponseEntity<BaseResponse> countPatients() {
        long count = patientService.countPatients();
        BaseResponse response = BaseResponse.createSuccessResponse("patient.success.count", count);
        return ResponseEntity.status(200).body(response);
    }

    /**
     * GET /api/patients/{id}/exists - Kiểm tra tồn tại
     */
    @GetMapping("/{id}/exists")
    public ResponseEntity<BaseResponse> existsById(@PathVariable String id) {
        boolean exists = patientService.existsById(id);
        BaseResponse response = BaseResponse.createSuccessResponse("patient.success.exists", exists);
        return ResponseEntity.status(200).body(response);
    }
}
