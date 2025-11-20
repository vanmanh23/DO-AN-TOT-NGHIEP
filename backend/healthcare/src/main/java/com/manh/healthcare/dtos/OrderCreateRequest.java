package com.manh.healthcare.dtos;

import com.manh.healthcare.entity.EOrderStatus;
import com.manh.healthcare.entity.EPriority;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class OrderCreateRequest {

    @NotNull(message = "Priority không được để trống")
    private EPriority priority;

    @NotNull(message = "Status không được để trống")
    private EOrderStatus status;

    private LocalDateTime scheduledAt;

    @NotNull(message = "Patient ID không được để trống")
    private String patientId;

    private String studyId;

    private Set<String> serviceItemIds; // Danh sách ID của ServiceItem

    private String doctorId;
}
