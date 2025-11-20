package com.manh.healthcare.dtos;

import com.manh.healthcare.entity.EModality;
import com.manh.healthcare.entity.EOrderStatus;
import com.manh.healthcare.entity.EPriority;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdersRequestDTO {
    private EPriority priority;
    private EOrderStatus status;
    private LocalDateTime scheduledAt;
    private LocalDateTime completedAt;
    private String studyId;
    private Set<String> serviceItemIds;
}
