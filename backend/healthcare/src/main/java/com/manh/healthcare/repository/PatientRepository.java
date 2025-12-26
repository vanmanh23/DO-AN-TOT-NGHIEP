package com.manh.healthcare.repository;

import com.manh.healthcare.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PatientRepository extends JpaRepository<Patient, String> {
    List<Patient> findByNameContainingIgnoreCase(String name);
    Patient findByPhoneNumber(String phoneNumber);

    @Query(value = """
        SELECT 
            CASE
                WHEN TIMESTAMPDIFF(YEAR, patient_birthdate, CURDATE()) BETWEEN 0 AND 12 THEN '0–12'
                WHEN TIMESTAMPDIFF(YEAR, patient_birthdate, CURDATE()) BETWEEN 13 AND 18 THEN '13–18'
                WHEN TIMESTAMPDIFF(YEAR, patient_birthdate, CURDATE()) BETWEEN 19 AND 40 THEN '19–40'
                WHEN TIMESTAMPDIFF(YEAR, patient_birthdate, CURDATE()) BETWEEN 41 AND 60 THEN '41–60'
                ELSE '60+'
            END AS ageGroup,
            COUNT(*) AS totalPatients
        FROM patient
        GROUP BY ageGroup
        ORDER BY 
            MIN(TIMESTAMPDIFF(YEAR, patient_birthdate, CURDATE()))
    """, nativeQuery = true)
    List<Object[]> countPatientsByAgeGroup();
}
