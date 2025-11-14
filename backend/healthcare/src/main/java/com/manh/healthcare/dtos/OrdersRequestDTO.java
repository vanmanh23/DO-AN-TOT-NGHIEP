package com.manh.healthcare.dtos;

import com.manh.healthcare.entity.EModality;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdersRequestDTO {
    private String patientId;
    private String modality;
    private String priority;
    private String status;
    private LocalDateTime scheduledAt;
}
