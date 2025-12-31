package com.manh.healthcare.repository;

import com.manh.healthcare.entity.EOrderStatus;
import com.manh.healthcare.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Orders, String> {
    @Query("SELECT o FROM Orders o WHERE o.id = :id")
    Orders findByOrderId(@Param("id") String id);

    List<Orders> findByStatus(EOrderStatus status);

    @Query(value = """
        SELECT 
            DATE(created_at) AS date,
            COUNT(DISTINCT patient_id) AS totalPatients
        FROM orders
        WHERE created_at BETWEEN :startDate AND :endDate
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at)
    """, nativeQuery = true)
    List<Object[]> countPatientsByDate(
            LocalDateTime startDate,
            LocalDateTime endDate
    );

    @Query("""
        SELECT o
        FROM Orders o
        WHERE o.status = :status
        ORDER BY 
            CASE 
                WHEN o.priority = com.manh.healthcare.entity.EPriority.URGENT THEN 0
                ELSE 1
            END,
            o.createdAt ASC
    """)
    List<Orders> findQueueByStatusOrderByPriority(
            @Param("status") EOrderStatus status
    );
}
