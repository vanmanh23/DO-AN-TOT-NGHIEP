package com.manh.healthcare.controller;


import com.manh.healthcare.dtos.BaseResponse;
import com.manh.healthcare.dtos.DoctorRequestDTO;
import com.manh.healthcare.dtos.DoctorResponseDTO;
import com.manh.healthcare.entity.Doctor;
import com.manh.healthcare.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;

    @PostMapping
    public ResponseEntity<BaseResponse> createDoctor(@RequestBody DoctorRequestDTO request) {
        DoctorResponseDTO response = doctorService.createDoctor(request);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("doctor.success.create", response);
        return ResponseEntity.status(201).body(baseResponse);
    }

    @GetMapping
    public ResponseEntity<BaseResponse> getAllDoctors() {
        List<DoctorResponseDTO> doctors = doctorService.findAll();
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("doctor.success.list", doctors);
        return ResponseEntity.ok(baseResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getById(@PathVariable String id) {
        DoctorResponseDTO doctorResponseDTO = doctorService.findById(id);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("doctor.success.findById", doctorResponseDTO);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateDoctor(
            @PathVariable String id,
            @RequestBody DoctorRequestDTO request) {

        DoctorResponseDTO updatedDoctor = doctorService.updateDoctor(id, request);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("doctor.success.update", updatedDoctor);
        return ResponseEntity.ok(baseResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteDoctor(@PathVariable String id) {
        doctorService.removeDoctor(id);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("doctor.success.delete", null);
        return ResponseEntity.ok(baseResponse);
    }

    @GetMapping("/inactive/{id}")
    public ResponseEntity<BaseResponse> inActiveDoctor(@PathVariable String id) {
        DoctorResponseDTO doctor = doctorService.inActiveDoctor(id);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("doctor.success.inActive", doctor);
        return ResponseEntity.ok(baseResponse);
    }
}