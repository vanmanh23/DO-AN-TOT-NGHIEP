package com.manh.healthcare.entity;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(name = "refresh_token")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "{error.refresh_token.token.blank")
    @Column(name = "token")
    private String token;

    @NotNull(message = "{error.refresh_token.user.null")
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(name = "expires_at")
    private Instant expiresAt;

    // Trong User.java, RefreshToken.java và Role.java
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RefreshToken)) return false; // Compare with RefreshToken
        RefreshToken that = (RefreshToken) o;
        return id == that.id; // Compare primitive int directly
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id); // Use id for hash code
    }
}
