package com.manh.healthcare.dtos;

import com.manh.healthcare.entity.EOrderStatus;
import com.manh.healthcare.entity.EPriority;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderWithoutPatientDTO {
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
        private PaymentResponseDTO payment;
        private StudyDTO study;
        private String doctorId;
        private DoctorResponseDTO doctor;
        private Set<ServiceItemResponseDTO> serviceItems;
}
