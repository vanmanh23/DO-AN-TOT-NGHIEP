package com.manh.healthcare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "roles")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 50, nullable = false)
    @NotNull(message = "{error.role.name.null}")
    @NotBlank(message = "{error.role.name.blank}")
    @Size(min = 1, max = 50, message = "{error.role.name.size")
//    @Column(name = "name", length = 50, nullable = false)
//    @Enumerated(EnumType.STRING)
    private String name;
}
