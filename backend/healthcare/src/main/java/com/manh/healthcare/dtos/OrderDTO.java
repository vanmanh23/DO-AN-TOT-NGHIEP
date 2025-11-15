package com.manh.healthcare.dtos;

import com.manh.healthcare.entity.EOrderStatus;
import com.manh.healthcare.entity.EPriority;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class OrderDTO {
    private String orderId;
    private EPriority priority;
    private EOrderStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime scheduledAt;
    private LocalDateTime completedAt;
    private String patientId;
    private String patientName;
    private String studyId;
    private Set<ServiceItemResponseDTO> serviceItems;
}
