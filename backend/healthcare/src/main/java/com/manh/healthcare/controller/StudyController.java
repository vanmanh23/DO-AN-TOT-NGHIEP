package com.manh.healthcare.controller;

import com.manh.healthcare.dtos.BaseResponse;
import com.manh.healthcare.dtos.StudyDTO;
import com.manh.healthcare.service.StudyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/studies")
public class StudyController {
    @Autowired
    private StudyService studyService;

    @GetMapping
    public ResponseEntity<BaseResponse> getAll() {
        List<StudyDTO> studies = studyService.getAll();
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("study.success.findAll", studies);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getById(@PathVariable String id) {
        StudyDTO study = studyService.getById(id);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("study.success.findByid", study);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @PostMapping
    public ResponseEntity<BaseResponse> create(@RequestBody StudyDTO dto) {
        StudyDTO study = studyService.create(dto);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("study.success.create", study);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> update(@PathVariable String id, @RequestBody StudyDTO dto) {
        StudyDTO study = studyService.update(id, dto);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("study.success.update", study);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        studyService.delete(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}
