package com.manh.healthcare.dtos;

import com.manh.healthcare.entity.EOrderStatus;
import com.manh.healthcare.entity.EPriority;
import lombok.Data;

import java.time.LocalDate;
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
    private LocalDate patientBirthday;
    private String patientName;
    private String orderCode;
//    private String studyId;
    private PaymentResponseDTO payment;
    private StudyDTO study;
    private String doctorId;
    private PatientResponseDTO patient;
    private DoctorResponseDTO doctor;
    private Set<ServiceItemResponseDTO> serviceItems;
}
