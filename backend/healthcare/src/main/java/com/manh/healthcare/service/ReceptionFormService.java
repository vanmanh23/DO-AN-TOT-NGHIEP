package com.manh.healthcare.service;

import com.manh.healthcare.dtos.ReceptionFormCancelDTO;
import com.manh.healthcare.dtos.ReceptionFormCreateDTO;
import com.manh.healthcare.dtos.ReceptionFormResponseDTO;
import com.manh.healthcare.dtos.ReceptionFormUpdateStatusDTO;
import com.manh.healthcare.entity.ReceptionForm;
import com.manh.healthcare.repository.ReceptionFormRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ReceptionFormService {
    @Autowired
    private ReceptionFormRepository receptionFormRepository;
    @Autowired
    private FormCodeGeneratorService formCodeGenerator;

    // Create new reception form
    @Transactional
    public ReceptionFormResponseDTO createNewForm(ReceptionFormCreateDTO createDTO) {
        // Auto-generate form code if not provided
        String formCode = createDTO.getFormCode();
        if (formCode == null || formCode.trim().isEmpty()) {
            formCode = formCodeGenerator.generateFormCode();
        }

        // Check if form code already exists
        if (receptionFormRepository.existsByFormCode(formCode)) {
            throw new RuntimeException("Form code already exists: " + formCode);
        }

        ReceptionForm form = new ReceptionForm();
        form.setFormCode(createDTO.getFormCode());
        form.setReceptionDate(createDTO.getReceptionDate() != null ?
                createDTO.getReceptionDate() : LocalDate.now());
        form.setReceptionTime(createDTO.getReceptionTime() != null ?
                createDTO.getReceptionTime() : LocalTime.now());
        form.setExaminationReason(createDTO.getExaminationReason());
        form.setStatus("WAITING");
        form.setNotes(createDTO.getNotes());

        ReceptionForm saved = receptionFormRepository.save(form);
        return convertToResponseDTO(saved);
    }

    // Update status
    @Transactional
    public ReceptionFormResponseDTO updateStatus(
            UUID formCode,
            ReceptionFormUpdateStatusDTO updateDTO
    ) {
        ReceptionForm form = receptionFormRepository.findById(formCode)
                .orElseThrow(() -> new RuntimeException("Form not found: " + formCode));

        // Check valid status
        if ("CANCELLED".equals(form.getStatus())) {
            throw new RuntimeException("Cannot update cancelled form");
        }

        form.setStatus(updateDTO.getStatus());
        if (updateDTO.getNotes() != null) {
            form.setNotes(updateDTO.getNotes());
        }

        ReceptionForm updated = receptionFormRepository.save(form);
        return convertToResponseDTO(updated);
    }

    // Cancel form
    @Transactional
    public ReceptionFormResponseDTO cancelForm(UUID formCode, ReceptionFormCancelDTO cancelDTO) {
        ReceptionForm form = receptionFormRepository.findById(formCode)
                .orElseThrow(() -> new RuntimeException("Form not found: " + formCode));

        if ("CANCELLED".equals(form.getStatus())) {
            throw new RuntimeException("Form already cancelled");
        }

        if ("COMPLETED".equals(form.getStatus())) {
            throw new RuntimeException("Cannot cancel completed form");
        }

        form.setStatus("CANCELLED");
        form.setNotes("Cancellation reason: " + cancelDTO.getCancellationReason());

        ReceptionForm updated = receptionFormRepository.save(form);
        return convertToResponseDTO(updated);
    }

    // Get all forms
    public List<ReceptionFormResponseDTO> getAllForms() {
        return receptionFormRepository.findAll().stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // Get form by code
    public ReceptionFormResponseDTO getFormByCode(UUID formCode) {
        ReceptionForm form = receptionFormRepository.findById(formCode)
                .orElseThrow(() -> new RuntimeException("Form not found: " + formCode));
        return convertToResponseDTO(form);
    }

    // Get forms by status
    public List<ReceptionFormResponseDTO> getFormsByStatus(String status) {
        return receptionFormRepository.findByStatus(status).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // Get forms by date
    public List<ReceptionFormResponseDTO> getFormsByDate(LocalDate date) {
        return receptionFormRepository.findByReceptionDate(date).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // Convert Entity to DTO
    private ReceptionFormResponseDTO convertToResponseDTO(ReceptionForm form) {
        return new ReceptionFormResponseDTO(
                form.getFormCode(),
                form.getReceptionDate(),
                form.getReceptionTime(),
                form.getExaminationReason(),
                form.getStatus(),
                form.getNotes()
        );
    }
}
