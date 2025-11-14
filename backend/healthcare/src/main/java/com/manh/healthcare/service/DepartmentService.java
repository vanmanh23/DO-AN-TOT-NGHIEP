package com.manh.healthcare.service;

import com.manh.healthcare.dtos.DepartmentDTO;
import com.manh.healthcare.dtos.DepartmentRequestDTO;
import com.manh.healthcare.entity.Department;
import com.manh.healthcare.repository.DepartmentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentService {
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private ModelMapper modelMapper;
    public List<DepartmentDTO> getAllDepartments() {
        return departmentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public DepartmentDTO getDepartmentById(String id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));
        return convertToDTO(department);
    }

    public DepartmentDTO createDepartment(DepartmentRequestDTO request) {
        if (departmentRepository.existsByName(request.getName())) {
            throw new RuntimeException("Department with name already exists: " + request.getName());
        }

//        Department department = new Department();
//        department.setName(request.getName());
//        department.setLocation(request.getLocation());
        Department department = modelMapper.map(request, Department.class);

        Department savedDepartment = departmentRepository.save(department);
        return convertToDTO(savedDepartment);
    }

    public DepartmentDTO updateDepartment(String id, DepartmentRequestDTO request) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));

        department.setName(request.getName());
        department.setLocation(request.getLocation());

        Department updatedDepartment = departmentRepository.save(department);
        return convertToDTO(updatedDepartment);
    }

    public void deleteDepartment(String id) {
        if (!departmentRepository.existsById(id)) {
            throw new RuntimeException("Department not found with id: " + id);
        }
        departmentRepository.deleteById(id);
    }

    private DepartmentDTO convertToDTO(Department department) {
        DepartmentDTO dto = new DepartmentDTO();
        dto.setId(department.getId());
        dto.setName(department.getName());
        dto.setLocation(department.getLocation());
        return dto;
    }
}
