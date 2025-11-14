package com.manh.healthcare.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "order_id")
    private String orderId;

    @Enumerated(EnumType.STRING)
    private EPriority priority;

    @Enumerated(EnumType.STRING)
    private EModality modality;

    @Enumerated(EnumType.STRING)
    private EOrderStatus status;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "scheduled_at")
    private LocalDateTime scheduledAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;  // quan hệ tới Patient
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "study_id", referencedColumnName = "id")
    private Study studies;
}
