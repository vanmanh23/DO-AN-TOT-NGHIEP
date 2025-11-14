package com.manh.healthcare.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "reception_form")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReceptionForm {
    @Id
    @Column(name = "form_code", length = 50)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String formCode;

    @Column(name = "reception_date", nullable = false)
    private LocalDate receptionDate;

    @Column(name = "reception_time", nullable = false)
    private LocalTime receptionTime;

    @Column(name = "examination_reason", columnDefinition = "TEXT")
    private String examinationReason;

    @Column(name = "status", length = 50, nullable = false)
    private String status;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @PrePersist
    protected void onCreate() {
        if (receptionDate == null) {
            receptionDate = LocalDate.now();
        }
        if (receptionTime == null) {
            receptionTime = LocalTime.now();
        }
        if (status == null) {
            status = "WAITING";
        }
    }
}
