package com.manh.healthcare.repository;

import com.manh.healthcare.entity.ReceptionForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface ReceptionFormRepository extends JpaRepository<ReceptionForm, UUID> {
    // Check if form exists
    boolean existsByFormCode(String formCode);
    // Find by status
    List<ReceptionForm> findByStatus(String status);

    // Find by reception date
    List<ReceptionForm> findByReceptionDate(LocalDate receptionDate);

    // Find by date and status
    List<ReceptionForm> findByReceptionDateAndStatus(
            LocalDate receptionDate, String status
    );

    // Find by date range
    @Query("SELECT r FROM ReceptionForm r WHERE r.receptionDate BETWEEN :startDate AND :endDate")
    List<ReceptionForm> findByDateRange(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}
