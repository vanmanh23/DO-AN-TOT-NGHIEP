package com.manh.healthcare.repository;

import com.manh.healthcare.dtos.MonthlyRevenueDTO;
import com.manh.healthcare.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {
    @Query("""
                SELECT new com.manh.healthcare.dtos.MonthlyRevenueDTO(
                    YEAR(p.paidAt),
                    MONTH(p.paidAt),
                    SUM(p.amount)
                )
                FROM Payment p
                WHERE p.status = 'PAID'
                  AND p.paidAt IS NOT NULL
                GROUP BY YEAR(p.paidAt), MONTH(p.paidAt)
                ORDER BY YEAR(p.paidAt) ASC, MONTH(p.paidAt) ASC
            """)
    List<MonthlyRevenueDTO> getMonthlyRevenue();
}
