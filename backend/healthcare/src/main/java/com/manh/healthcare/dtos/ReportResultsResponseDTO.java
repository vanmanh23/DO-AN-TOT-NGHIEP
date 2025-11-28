package com.manh.healthcare.dtos;

import com.manh.healthcare.dtos.OrderDTO;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportResultsResponseDTO {
    private String id;
    private String description;
    private String conclusion;
    private String suggestion;
    private OrderDTO order;
    private byte[] pdf_report;
}
