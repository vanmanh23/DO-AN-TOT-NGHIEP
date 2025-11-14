package com.manh.healthcare.repository;

import com.manh.healthcare.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PatientRepository extends JpaRepository<Patient, String> {
    List<Patient> findByNameContainingIgnoreCase(String name);
    Patient findByPhoneNumber(String phoneNumber);
}
