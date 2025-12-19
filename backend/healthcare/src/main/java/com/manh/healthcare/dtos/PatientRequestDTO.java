package com.manh.healthcare.dtos;

import com.manh.healthcare.entity.EGender;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientRequestDTO {

    @NotBlank(message = "Patient name must not be empty")
    @Size(min = 2, max = 100, message = "Name must be between 2-100 characters")
    private String name;

    @NotNull(message = "Birthdate must not be empty")
    @Past(message = "Birthdate must be a past date")
    private LocalDate birthdate;

    @NotNull(message = "Gender must not be empty")
    private EGender gender;

//    @NotNull(message = "Age must not be empty.")
//    private Integer age;

    @NotBlank(message = "Address must not be empty")
    @Size(max = 255, message = "Address must not exceed 255 characters")
    private String address;

    @Pattern(regexp = "^(\\+84|0)[0-9]{9,10}$", message = "Phone number is invalid")
    private String phoneNumber;

    @NotBlank(message = "Identity card cannot be blank")
    @Size(min = 12, max = 12, message = "Identity card must be exactly 12 characters")
    private String identityCard;

    private String gmail;
}
