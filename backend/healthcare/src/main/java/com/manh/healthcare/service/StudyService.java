package com.manh.healthcare.service;

import com.manh.healthcare.dtos.StudyDTO;
import com.manh.healthcare.entity.Orders;
import com.manh.healthcare.entity.Study;
import com.manh.healthcare.repository.OrderRepository;
import com.manh.healthcare.repository.StudyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudyService {
    @Autowired
    private StudyRepository studyRepository;
    @Autowired
    private OrderRepository ordersRepository;


    public List<StudyDTO> getAll() {
        return studyRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public StudyDTO getById(String id) {
        Study study = studyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Study not found"));

        return this.toDTO(study);
    }

    public StudyDTO create(StudyDTO dto) {
        Orders order = ordersRepository
                .findById(dto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Study study = this.toEntity(dto, order);
        Study saved = studyRepository.save(study);

        return this.toDTO(saved);
    }

    public StudyDTO update(String id, StudyDTO dto) {

        Study study = studyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Study not found"));

        Orders order = ordersRepository
                .findById(dto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        study.setStudyInstanceUID(dto.getStudyInstanceUID());
        study.setSeriesInstanceUID(dto.getSeriesInstanceUID());
        study.setInstanceUID(dto.getInstanceUID());
        study.setOrder(order);

        Study saved = studyRepository.save(study);

        return this.toDTO(saved);
    }

    public void delete(String id) {
        if (!studyRepository.existsById(id)) {
            throw new RuntimeException("Study not found");
        }
        studyRepository.deleteById(id);
    }

    public StudyDTO toDTO(Study study) {
        StudyDTO dto = new StudyDTO();

        dto.setId(study.getID());
        dto.setStudyInstanceUID(study.getStudyInstanceUID());
        dto.setSeriesInstanceUID(study.getSeriesInstanceUID());
        dto.setInstanceUID(study.getInstanceUID());

        if (study.getOrder() != null) {
            dto.setOrderId(study.getOrder().getOrderId()); // lấy FK
        }

        return dto;
    }

    public Study toEntity(StudyDTO dto, Orders order) {
        Study study = new Study();

        study.setStudyInstanceUID(dto.getStudyInstanceUID());
        study.setSeriesInstanceUID(dto.getSeriesInstanceUID());
        study.setInstanceUID(dto.getInstanceUID());
        study.setOrder(order);

        return study;
    }
}
