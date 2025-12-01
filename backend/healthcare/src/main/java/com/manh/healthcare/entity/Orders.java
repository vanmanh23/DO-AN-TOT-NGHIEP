package com.manh.healthcare.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

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
    private EOrderStatus status;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "scheduled_at")
    private LocalDateTime scheduledAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    @JsonBackReference
    @ToString.Exclude
    private Patient patient;  // quan hệ tới Patient

//    @JoinColumn(name = "study_id", referencedColumnName = "order_id")

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    private Study study;

//    @OneToOne
//    @JoinColumn(name = "doctor_id")
    @ManyToOne
    @JoinColumn(name="doctor_id")
    private Doctor doctor;

    @JsonManagedReference
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToMany
    @JoinTable(
            name = "order_service_items",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "id")
    )
    private Set<ServiceItem> serviceItems;
//    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    private ReportResults reportResults;
}
