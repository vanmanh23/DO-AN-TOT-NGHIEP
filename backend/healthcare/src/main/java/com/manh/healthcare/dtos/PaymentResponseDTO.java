package com.manh.healthcare.dtos;

import com.manh.healthcare.entity.EPaymentMethod;
import com.manh.healthcare.entity.EPaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponseDTO {
    private String id;

    private double amount;

    private EPaymentStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime paidAt;

    private EPaymentMethod method;

    private String orderId;

    private String patientId;

//    private OrderDTO order;
//
//    private PatientResponseDTO patient;
}
