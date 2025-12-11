package com.manh.healthcare.dtos;

import com.manh.healthcare.entity.EGender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientDTO {
    private String id;
    private String name;
    private LocalDate birthdate;
    private Integer age;
    private EGender gender;
    private String address;
    private String phoneNumber;
    private String identityCard;
    private List<String> orderIds;
    private List<String> paymentIds;
}
