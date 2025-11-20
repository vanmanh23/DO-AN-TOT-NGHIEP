package com.manh.healthcare.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "radiologic_technologists")  // Fixed table name to match entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RadiologicTechnologist {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne
    @JoinColumn(name = "person_id", nullable = false, unique = true)
    private Person person;

    @Column(name = "staff_code", unique = true, nullable = false, length = 20)
    private String staffCode;

    @Column(name = "specialization", length = 100)
    private String specialization; // X-ray, CT, MRI, Ultrasound, etc.

    @Column(name = "qualification", length = 100)
    private String qualification; // Certificate, Associate, Bachelor

    @Column(name = "certifications", length = 255)
    private String certifications; // Professional certifications

    @Column(name = "license_number", length = 50)
    private String licenseNumber;

    @Column(name = "license_issue_date")
    private LocalDate licenseIssueDate;

    @Column(name = "license_expiry_date")
    private LocalDate licenseExpiryDate;

    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;

    @Column(name = "department", length = 50)
    private String department; // X-ray Room, CT Room, MRI Room

    @Column(name = "work_shift", length = 20)
    private String workShift; // Morning, Afternoon, Evening, Rotating

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "status", length = 20)
    private String status; // Active, On Leave, Terminated

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

//    // Constructors
//    public RadiologicTechnologist() {
//        this.createdAt = LocalDateTime.now();
//        this.updatedAt = LocalDateTime.now();
//        this.trangThai = "Đang làm việc";
//    }
}
