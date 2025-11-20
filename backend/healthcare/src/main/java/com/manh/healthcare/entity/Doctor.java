package com.manh.healthcare.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "doctors")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne
    @JoinColumn(name = "person_id", nullable = false, unique = true)
    private Person person;

    @Column(name = "doctor_code", unique = true, nullable = false, length = 20)
    private String doctorCode;

    @Column(name = "specialization", length = 100)
    private String specialization;

    @Column(name = "degree", length = 100)
    private String degree;

    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;

    @Column(name = "clinic_room", length = 50)
    private String clinicRoom;

    @Column(name = "status", length = 20)
    private String status;

    @OneToOne(mappedBy = "doctor", cascade = CascadeType.ALL)
    private Orders order;
}
