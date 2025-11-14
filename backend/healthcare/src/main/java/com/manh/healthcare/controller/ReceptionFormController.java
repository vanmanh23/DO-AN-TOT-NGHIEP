package com.manh.healthcare.controller;


import com.manh.healthcare.dtos.BaseResponse;
import com.manh.healthcare.dtos.ReceptionFormCreateDTO;
import com.manh.healthcare.dtos.ReceptionFormResponseDTO;
import com.manh.healthcare.service.FormCodeGeneratorService;
import com.manh.healthcare.service.ReceptionFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reception-forms")
public class ReceptionFormController {
    @Autowired
    private ReceptionFormService service;
    @Autowired
    private FormCodeGeneratorService formCodeGenerator;

    // Generate new form code (Preview before creating)
    @GetMapping("/generate-code")
    public ResponseEntity<String> generateFormCode() {
        String formCode = formCodeGenerator.generateFormCode();
        return ResponseEntity.ok(formCode);
    }
    // Create new form
    @PostMapping
    public ResponseEntity<BaseResponse> createForm(
            @RequestBody ReceptionFormCreateDTO createDTO
    ) {
        try {
            ReceptionFormResponseDTO response = service.createNewForm(createDTO);
            BaseResponse baseResponse = BaseResponse.createSuccessResponse("receptionForm.success.create", response);
            return ResponseEntity.status(HttpStatus.CREATED).body(baseResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Update status
//    @PutMapping("/{formCode}/status")
//    public ResponseEntity<ReceptionFormResponseDTO> updateStatus(
//            @PathVariable String formCode,
//            @RequestBody ReceptionFormUpdateStatusDTO updateDTO
//    ) {
//        try {
//            ReceptionFormResponseDTO response = service.updateStatus(formCode, updateDTO);
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
//        }
//    }
//
//    // Cancel form
//    @PutMapping("/{formCode}/cancel")
//    public ResponseEntity<ReceptionFormResponseDTO> cancelForm(
//            @PathVariable String formCode,
//            @RequestBody ReceptionFormCancelDTO cancelDTO
//    ) {
//        try {
//            ReceptionFormResponseDTO response = service.cancelForm(formCode, cancelDTO);
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
//        }
//    }
//
//    // Get all forms
//    @GetMapping
//    public ResponseEntity<List<ReceptionFormResponseDTO>> getAllForms() {
//        List<ReceptionFormResponseDTO> forms = service.getAllForms();
//        return ResponseEntity.ok(forms);
//    }
//
//    // Get form by code
//    @GetMapping("/{formCode}")
//    public ResponseEntity<ReceptionFormResponseDTO> getFormByCode(
//            @PathVariable String formCode
//    ) {
//        try {
//            ReceptionFormResponseDTO response = service.getFormByCode(formCode);
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//    }
//
//    // Get forms by status
//    @GetMapping("/status/{status}")
//    public ResponseEntity<List<ReceptionFormResponseDTO>> getFormsByStatus(
//            @PathVariable String status
//    ) {
//        List<ReceptionFormResponseDTO> forms = service.getFormsByStatus(status);
//        return ResponseEntity.ok(forms);
//    }
//
//    // Get forms by date
//    @GetMapping("/date/{date}")
//    public ResponseEntity<List<ReceptionFormResponseDTO>> getFormsByDate(
//            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
//    ) {
//        List<ReceptionFormResponseDTO> forms = service.getFormsByDate(date);
//        return ResponseEntity.ok(forms);
//    }
}