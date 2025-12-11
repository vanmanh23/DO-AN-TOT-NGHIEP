package com.manh.healthcare.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportResultsRequestDTO {
    private String description;
    private String conclusion;
    private String suggestion;
    private String orderId;
    private String studyUID;
    private String seriesUID ;
    private String instances;

    private String aiNutriRecommen;
}