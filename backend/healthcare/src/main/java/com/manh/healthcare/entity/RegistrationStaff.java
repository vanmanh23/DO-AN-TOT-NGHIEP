package com.manh.healthcare.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "registration_staff")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationStaff {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne
    @JoinColumn(name = "person_id", nullable = false, unique = true)
    private Person person;

    @Column(name = "staff_code", unique = true, nullable = false, length = 20)
    private String staffCode;

    @Column(name = "department", length = 50)
    private String department; // Reception, Pharmacy, etc.

    @Column(name = "work_shift", length = 20)
    private String workShift; // Morning, Afternoon, Evening

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "status", length = 20)
    private String status; // Active, On Leave
}
