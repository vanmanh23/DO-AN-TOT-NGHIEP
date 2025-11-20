package com.manh.healthcare.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "patient")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
    @Id
    @Column(name = "id")
    private String ID;
    @Column(name = "patient_name", nullable = false)
    private String name;
    @Column(name = "patient_birthdate", nullable = false)
    private LocalDate birthdate;
    @Transient
    private Integer age;
    @Column(name = "patient_gender", nullable = false)
    private EGender gender;
    @Column(name = "patient_address", nullable = false)
    private String address;
    @Column(name = "patient_phonenumber")
    private String phoneNumber;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Orders> orders = new ArrayList<>();

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Study> studies = new ArrayList<>();

    // Method để tính age
    public Integer getAge() {
        if (birthdate == null) return null;
        return Period.between(birthdate, LocalDate.now()).getYears();
    }
    }
