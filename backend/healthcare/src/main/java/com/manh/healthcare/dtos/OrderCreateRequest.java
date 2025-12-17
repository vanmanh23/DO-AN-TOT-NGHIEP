package com.manh.healthcare.dtos;

import com.manh.healthcare.entity.EOrderStatus;
import com.manh.healthcare.entity.EPriority;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class OrderCreateRequest {

    @NotNull(message = "Priority must not be empty")
    private EPriority priority;

    @NotNull(message = "Status must not be empty")
    private EOrderStatus status;

    private LocalDateTime scheduledAt;

    @NotNull(message = "Patient ID must not be empty")
    private String patientId;

//    private String studyId;
//    private Study

    private Set<String> serviceItemIds; // List of ServiceItem IDs

    private String doctorId;
}
