package com.manh.healthcare.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    private String username;
    private Set<String> roles;
    private String phoneNumber;
    private String email;
}
