package com.manh.healthcare.repository;

import com.manh.healthcare.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, String> {
    Optional<Department> findByName(String name);
    boolean existsByName(String name);
}
