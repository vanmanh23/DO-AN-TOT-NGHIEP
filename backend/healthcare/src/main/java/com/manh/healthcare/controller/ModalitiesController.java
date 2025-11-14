package com.manh.healthcare.controller;

import com.manh.healthcare.dtos.BaseResponse;
import com.manh.healthcare.dtos.ModalitiesDTO;
import com.manh.healthcare.dtos.ModalitiesRequestDTO;
import com.manh.healthcare.entity.EModality;
import com.manh.healthcare.entity.EStatusModality;
import com.manh.healthcare.service.ModalitiesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modalities")
public class ModalitiesController {
    @Autowired
    private ModalitiesService modalitiesService;

    @GetMapping
    public ResponseEntity<BaseResponse> getAllModalities() {
        List<ModalitiesDTO> modalities = modalitiesService.getAllModalities();
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("modalities.success.findAll", modalities);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getModalityById(@PathVariable String id) {
        ModalitiesDTO modality = modalitiesService.getModalityById(id);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("modalities.success.findById", modality);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<BaseResponse> getModalitiesByType(@PathVariable EModality type) {
        List<ModalitiesDTO> modalities = modalitiesService.getModalitiesByType(type);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("modalities.success.findByType", modalities);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<BaseResponse> getModalitiesByStatus(@PathVariable EStatusModality status) {
        List<ModalitiesDTO> modalities = modalitiesService.getModalitiesByStatus(status);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("modalities.success.findByStatus", modalities);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @GetMapping("/department/{departmentId}")
    public ResponseEntity<BaseResponse> getModalitiesByDepartment(@PathVariable String departmentId) {
        List<ModalitiesDTO> modalities = modalitiesService.getModalitiesByDepartment(departmentId);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("modalities.success.findByDepartment", modalities);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @PostMapping
    public ResponseEntity<ModalitiesDTO> createModality(@Valid @RequestBody ModalitiesRequestDTO request) {
        ModalitiesDTO modality = modalitiesService.createModality(request);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("modalities.success.create", modality);
        return ResponseEntity.status(HttpStatus.CREATED).body(modality);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateModality(
            @PathVariable String id,
            @Valid @RequestBody ModalitiesRequestDTO request) {
        ModalitiesDTO modality = modalitiesService.updateModality(id, request);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("modalities.success.update", modality);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModality(@PathVariable String id) {
        modalitiesService.deleteModality(id);
        return ResponseEntity.noContent().build();
    }
}
