package com.manh.healthcare.dtos;

import com.manh.healthcare.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    private String id;
    private String username;
    private Set<Role> roles;
//    private Set<String> roles;
    private String phoneNumber;
    private String email;
}
