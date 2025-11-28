package com.manh.healthcare.repository;

import com.manh.healthcare.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Orders, String> {
    @Query("SELECT o FROM Orders o WHERE o.id = :id")
    Orders findByOrderId(@Param("id") String id);
}
