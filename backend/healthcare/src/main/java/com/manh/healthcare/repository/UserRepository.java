package com.manh.healthcare.repository;

import com.manh.healthcare.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByUsername(String username);
    Optional<User> findByUsername(String username);
    // Đếm số user có userId bắt đầu bằng pattern
//    @Query("SELECT COUNT(u) FROM User u WHERE u.userId LIKE :pattern")
    @Query("SELECT COUNT(u) FROM User u WHERE u.id LIKE CONCAT(:pattern, '%')")
    Long countByUserIdStartingWith(@Param("pattern") String pattern);
    Optional<User> findByEmail(String email);
}
