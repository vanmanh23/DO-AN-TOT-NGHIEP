package com.manh.healthcare.repository;

import com.manh.healthcare.entity.EModality;
import com.manh.healthcare.entity.EStatusModality;
import com.manh.healthcare.entity.Modalities;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ModalitiesRepository extends JpaRepository<Modalities, String> {
    List<Modalities> findByType(EModality type);
    List<Modalities> findByStatus(EStatusModality status);
//    List<Modalities> findById(String departmentId);
    Optional<Modalities> findByDepartmentId(String departmentId);
}
