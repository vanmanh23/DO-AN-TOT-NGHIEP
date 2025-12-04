package com.manh.healthcare.dtos;

import com.manh.healthcare.entity.EPaymentMethod;
import com.manh.healthcare.entity.EPaymentStatus;
import com.manh.healthcare.entity.Orders;
import com.manh.healthcare.entity.Patient;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequestDTO {
    private String id;

    private EPaymentStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime paidAt;

    private EPaymentMethod method;

    private String orderId;

    private String patientId;
}
