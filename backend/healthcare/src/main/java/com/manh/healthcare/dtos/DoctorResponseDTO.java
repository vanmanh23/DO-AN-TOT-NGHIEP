package com.manh.healthcare.dtos;

import com.manh.healthcare.entity.Person;
import lombok.Data;

import java.time.LocalDate;

@Data
public class DoctorResponseDTO {
    private String id;
    private String fullName;
    private LocalDate dateOfBirth;
    private String gender;
    private String phoneNumber;
    private String email;
    private String address;
    private String doctorCode;
    private String specialization;
    private String degree;
    private Integer yearsOfExperience;
    private String clinicRoom;
    private String status;

    private PersonDTO person;
}
