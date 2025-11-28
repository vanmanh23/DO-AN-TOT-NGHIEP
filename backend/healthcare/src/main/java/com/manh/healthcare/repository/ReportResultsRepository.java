package com.manh.healthcare.repository;

import com.manh.healthcare.entity.ReportResults;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReportResultsRepository extends JpaRepository<ReportResults, String> {
    @Query("SELECT r FROM ReportResults r WHERE r.order.id = :orderId")
    Optional<ReportResults> findReportByOrderId(String orderId);
    boolean existsByOrderOrderId(String orderId);
}
