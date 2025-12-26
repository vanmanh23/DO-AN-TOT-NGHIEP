package com.manh.healthcare.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AgeGroupPatientDTO {
    private String ageGroup;
    private Long totalPatients;
}