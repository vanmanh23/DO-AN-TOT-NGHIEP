package com.manh.healthcare.dtos;

import com.manh.healthcare.entity.EModality;
import com.manh.healthcare.entity.EOrderStatus;
import com.manh.healthcare.entity.EPriority;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdersResponseDTO {
    private String orderId;
    private String patientId;
    private String patientName;
    private EModality modality;
    private EPriority priority;
    private EOrderStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime scheduledAt;
    private LocalDateTime completedAt;
}
