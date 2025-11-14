package com.manh.healthcare.service;

import com.manh.healthcare.dtos.DepartmentDTO;
import com.manh.healthcare.dtos.ModalitiesDTO;
import com.manh.healthcare.dtos.ModalitiesRequestDTO;
import com.manh.healthcare.dtos.ServiceItemResponseDTO;
import com.manh.healthcare.entity.Department;
import com.manh.healthcare.entity.EModality;
import com.manh.healthcare.entity.EStatusModality;
import com.manh.healthcare.entity.Modalities;
import com.manh.healthcare.repository.DepartmentRepository;
import com.manh.healthcare.repository.ModalitiesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ModalitiesService {
    @Autowired
    private ModalitiesRepository modalitiesRepository;
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private ModelMapper modelMapper;

    public List<ModalitiesDTO> getAllModalities() {
        return modalitiesRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ModalitiesDTO getModalityById(String id) {
        Modalities modality = modalitiesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Modality not found with id: " + id));
        return convertToDTO(modality);
    }

    public List<ModalitiesDTO> getModalitiesByType(EModality type) {
        System.out.println( modalitiesRepository.findByType(type));
        return modalitiesRepository.findByType(type).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ModalitiesDTO> getModalitiesByStatus(EStatusModality status) {
        return modalitiesRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ModalitiesDTO> getModalitiesByDepartment(String departmentId) {
        return modalitiesRepository.findByDepartmentId(departmentId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ModalitiesDTO createModality(ModalitiesRequestDTO request) {
        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + request.getDepartmentId()));

        Modalities modality = new Modalities();
        modality.setType(request.getType());
        modality.setManufacturer(request.getManufacturer());
        modality.setModel(request.getModel());
        modality.setStatus(request.getStatus());
        modality.setDepartment(department);

        Modalities savedModality = modalitiesRepository.save(modality);
        return convertToDTO(savedModality);
    }

    public ModalitiesDTO updateModality(String id, ModalitiesRequestDTO request) {
        Modalities modality = modalitiesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Modality not found with id: " + id));

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + request.getDepartmentId()));

        modality.setType(request.getType());
        modality.setManufacturer(request.getManufacturer());
        modality.setModel(request.getModel());
        modality.setStatus(request.getStatus());
        modality.setDepartment(department);

        Modalities updatedModality = modalitiesRepository.save(modality);
        return convertToDTO(updatedModality);
    }

    public void deleteModality(String id) {
        if (!modalitiesRepository.existsById(id)) {
            throw new RuntimeException("Modality not found with id: " + id);
        }
        modalitiesRepository.deleteById(id);
    }

    private ModalitiesDTO convertToDTO(Modalities modality) {
        ModalitiesDTO dto = new ModalitiesDTO();
        dto.setId(modality.getId());
        dto.setType(modality.getType());
        dto.setManufacturer(modality.getManufacturer());
        dto.setModel(modality.getModel());
        dto.setStatus(modality.getStatus());
//        Set<ServiceItemResponseDTO> serviceItemResponseDTOS = modality.getServiceItems().stream()
//                        .map(item -> modelMapper.map(item, ServiceItemResponseDTO.class))
//                        .collect(Collectors.toSet());;
//        dto.setServiceItems(serviceItemResponseDTOS);

        if (modality.getDepartment() != null) {
            dto.setDepartmentId(modality.getDepartment().getId());
            DepartmentDTO departmentDTO = new DepartmentDTO();
            departmentDTO.setId(modality.getDepartment().getId());
            departmentDTO.setName(modality.getDepartment().getName());
            departmentDTO.setLocation(modality.getDepartment().getLocation());
            dto.setDepartment(departmentDTO);
        }

        return dto;
    }
}
