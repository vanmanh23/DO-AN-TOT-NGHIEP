package com.manh.healthcare.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientResponseDTO {
    private String id;
    private String patientName;
    private String gender;
    private LocalDate patientBirthDate;
    private Integer age;
    private String address;
    private String phoneNumber;
    private PaymentResponseDTO payments;
}
