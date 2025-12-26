package com.manh.healthcare.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DailyPatientCountDTO {
    private String date;        // dd/MM
    private Long totalPatients;
}