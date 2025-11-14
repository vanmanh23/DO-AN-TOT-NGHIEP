package com.manh.healthcare.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

// DTO cho response
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceptionFormResponseDTO {
    private String formCode;
    private LocalDate receptionDate;
    private LocalTime receptionTime;
    private String examinationReason;
    private String status;
    private String notes;
}
