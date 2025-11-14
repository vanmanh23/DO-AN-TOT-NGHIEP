package com.manh.healthcare.service;

import com.manh.healthcare.dtos.ServiceItemRequestDTO;
import com.manh.healthcare.dtos.ServiceItemResponseDTO;
import com.manh.healthcare.entity.Modalities;
import com.manh.healthcare.entity.ServiceItem;
import com.manh.healthcare.exception.DuplicateResourceException;
import com.manh.healthcare.exception.ResourceNotFoundException;
import com.manh.healthcare.repository.ModalitiesRepository;
import com.manh.healthcare.repository.ServiceItemRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceItemService {
    @Autowired
    private ModalitiesRepository modalitiesRepository;
    @Autowired
    private ServiceItemRepository serviceItemRepository;
    @Autowired
    private ModelMapper modelMapper;
    public ServiceItemResponseDTO createServiceItem(ServiceItemRequestDTO dto) {
        // Kiểm tra service code đã tồn tại chưa
        if (serviceItemRepository.existsByServiceCode(dto.getServiceCode())) {
            throw new DuplicateResourceException("Service code already exists: " + dto.getServiceCode());
        }
        // Tìm Modality
        Modalities modality = modalitiesRepository.findById(dto.getModalityId())
                .orElseThrow(() -> new ResourceNotFoundException("Modality not found with id: " + dto.getModalityId()));

        // Tạo entity mới
        ServiceItem serviceItem = new ServiceItem();
        serviceItem.setServiceCode(dto.getServiceCode());
        serviceItem.setServiceName(dto.getServiceName());
        serviceItem.setUnitPrice(dto.getUnitPrice());
        serviceItem.setModality(modality);

        // Lưu vào database
        ServiceItem savedItem = serviceItemRepository.save(serviceItem);
        ServiceItemResponseDTO serviceItemResponseDTO = modelMapper.map(savedItem, ServiceItemResponseDTO.class);
        return serviceItemResponseDTO;
    }

    // Lấy ServiceItem theo ID
    public ServiceItemResponseDTO getServiceItemById(String id) {
        ServiceItem serviceItem = serviceItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceItem not found with id: " + id));
        ServiceItemResponseDTO serviceItemResponseDTO = modelMapper.map(serviceItem, ServiceItemResponseDTO.class);
        return serviceItemResponseDTO;
    }

    // Lấy tất cả ServiceItem
    public List<ServiceItemResponseDTO> getAllServiceItems() {
        List<ServiceItem> serviceItems = serviceItemRepository.findAll();
        List<ServiceItemResponseDTO> serviceItemResponseDTOS = serviceItems.stream()
                .map(item -> modelMapper.map(item, ServiceItemResponseDTO.class)).toList();
        return serviceItemResponseDTOS;
    }

    // Lấy ServiceItem theo Modality ID
    public List<ServiceItemResponseDTO> getServiceItemsByModalityId(String modalityId) {
        List<ServiceItem> serviceItems = serviceItemRepository.findByModalityId(modalityId);
        List<ServiceItemResponseDTO> serviceItemResponseDTOS = serviceItems.stream()
                .map(item -> modelMapper.map(item, ServiceItemResponseDTO.class)).toList();
        return serviceItemResponseDTOS;
    }

    // Cập nhật ServiceItem
    public ServiceItemResponseDTO updateServiceItem(String id, ServiceItemRequestDTO dto) {
        ServiceItem serviceItem = serviceItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceItem not found with id: " + id));

        // Cập nhật các field nếu có
        if (dto.getServiceCode() != null && !dto.getServiceCode().isEmpty()) {
            // Kiểm tra service code mới có trùng với service khác không
            if (!serviceItem.getServiceCode().equals(dto.getServiceCode())
                    && serviceItemRepository.existsByServiceCode(dto.getServiceCode())) {
                throw new DuplicateResourceException("Service code already exists: " + dto.getServiceCode());
            }
            serviceItem.setServiceCode(dto.getServiceCode());
        }

        if (dto.getServiceName() != null && !dto.getServiceName().isEmpty()) {
            serviceItem.setServiceName(dto.getServiceName());
        }

        if (dto.getUnitPrice() != null) {
            serviceItem.setUnitPrice(dto.getUnitPrice());
        }

        if (dto.getModalityId() != null && !dto.getModalityId().isEmpty()) {
            Modalities modality = modalitiesRepository.findById(dto.getModalityId())
                    .orElseThrow(() -> new ResourceNotFoundException("Modality not found with id: " + dto.getModalityId()));
            serviceItem.setModality(modality);
        }

        ServiceItem updatedItem = serviceItemRepository.save(serviceItem);
        ServiceItemResponseDTO serviceItemResponseDTO = modelMapper.map(updatedItem, ServiceItemResponseDTO.class);
        return serviceItemResponseDTO;
    }

    // Xóa ServiceItem
    public void deleteServiceItem(String id) {
        if (!serviceItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("ServiceItem not found with id: " + id);
        }
        serviceItemRepository.deleteById(id);
    }
}
