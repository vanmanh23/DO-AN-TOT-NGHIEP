package com.manh.healthcare.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

// DTO cho việc tạo phiếu mới
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceptionFormCreateDTO {
    private String formCode;
    private LocalDate receptionDate;
    private LocalTime receptionTime;
    private String examinationReason;
    private String notes;
}
