package com.manh.healthcare.repository;

import com.manh.healthcare.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Orders, String> {
//    @Query(value = "SELECT * FROM orders o " +
////            "WHERE o.modality = :modality " +
////            "ORDER BY " +
////            "CASE o.priority " +
////            "    WHEN 'STAT' THEN 1 " +
////            "    WHEN 'ASAP' THEN 2 " +
////            "    WHEN 'ROUTINE' THEN 3 " +
////            "    ELSE 4 " +
////            "END, " +
////            "o.created_at ASC",
////            nativeQuery = true)
////    List<Orders> findByModalityOrderByPriorityAndCreatedAt(@Param("modality") String modality);
// Repository - đơn giản
//List<Orders> findByModality(EModality modality);
}
