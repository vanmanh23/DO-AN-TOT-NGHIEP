package com.manh.healthcare.repository;

import com.manh.healthcare.entity.EModality;
import com.manh.healthcare.entity.ServiceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceItemRepository extends JpaRepository<ServiceItem, String> {
    Optional<ServiceItem> findByServiceCode(String serviceCode);
    List<ServiceItem> findByModalityId(String modalityId);
    boolean existsByServiceCode(String serviceCode);
    List<ServiceItem> findByModalityType(EModality type);
}
