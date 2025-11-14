package com.manh.healthcare.controller;

import com.manh.healthcare.dtos.BaseResponse;
import com.manh.healthcare.dtos.DepartmentDTO;
import com.manh.healthcare.dtos.DepartmentRequestDTO;
import com.manh.healthcare.service.DepartmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;
    @GetMapping
    public ResponseEntity<BaseResponse> getAllDepartments() {
        List<DepartmentDTO> departments = departmentService.getAllDepartments();
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("departments.success.findAll", departments);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getDepartmentById(@PathVariable String id) {
        DepartmentDTO department = departmentService.getDepartmentById(id);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("departments.success.findById", department);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @PostMapping
    public ResponseEntity<BaseResponse> createDepartment(@Valid @RequestBody DepartmentRequestDTO request) {
        DepartmentDTO department = departmentService.createDepartment(request);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("department.success.create", department);
        return ResponseEntity.status(HttpStatus.CREATED).body(baseResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateDepartment(
            @PathVariable String id,
            @Valid @RequestBody DepartmentRequestDTO request) {
        DepartmentDTO department = departmentService.updateDepartment(id, request);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("department.success.update", department);
        return ResponseEntity.status(200).body(baseResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable String id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.noContent().build();
    }
}
