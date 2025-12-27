package com.manh.healthcare.dtos;

import jakarta.persistence.Column;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class PersonDTO {
    private String id;
    private String fullName;
    private LocalDate dateOfBirth;
    private String gender; // Male, Female, Other
    private String phoneNumber;
    private String email;
    private String address;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
