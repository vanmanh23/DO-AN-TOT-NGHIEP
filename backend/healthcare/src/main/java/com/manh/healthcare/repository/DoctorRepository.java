package com.manh.healthcare.repository;

import com.manh.healthcare.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, String> {
    Optional<Doctor> findByPersonId(String personId);
    Doctor getDoctorById(String id);
}
