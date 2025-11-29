package com.manh.healthcare.controller;

import com.manh.healthcare.dtos.BaseResponse;
import com.manh.healthcare.dtos.ModalitiesDTO;
import com.manh.healthcare.dtos.ServiceItemRequestDTO;
import com.manh.healthcare.dtos.ServiceItemResponseDTO;
import com.manh.healthcare.entity.EModality;
import com.manh.healthcare.service.ServiceItemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-items")
public class ServiceItemController {
    @Autowired
    private ServiceItemService serviceItemService;

    // Tạo mới ServiceItem
    @PostMapping
    public ResponseEntity<ServiceItemResponseDTO> createServiceItem(
            @Valid @RequestBody ServiceItemRequestDTO dto) {
        ServiceItemResponseDTO response = serviceItemService.createServiceItem(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Lấy ServiceItem theo ID
    @GetMapping("/{id}")
    public ResponseEntity<ServiceItemResponseDTO> getServiceItemById(@PathVariable String id) {
        ServiceItemResponseDTO response = serviceItemService.getServiceItemById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<BaseResponse> getModalitiesByType(@PathVariable EModality type) {
        List<ServiceItemResponseDTO> serviceItems = serviceItemService.findByType(type);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("serviceItems.success.findByType", serviceItems);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }
    // Lấy tất cả ServiceItem
    @GetMapping
    public ResponseEntity<BaseResponse> getAllServiceItems() {
        List<ServiceItemResponseDTO> response = serviceItemService.getAllServiceItems();
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("services.success.findAll", response);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    // Lấy ServiceItem theo Modality ID
    @GetMapping("/modality/{modalityId}")
    public ResponseEntity<List<ServiceItemResponseDTO>> getServiceItemsByModalityId(
            @PathVariable String modalityId) {
        List<ServiceItemResponseDTO> response = serviceItemService.getServiceItemsByModalityId(modalityId);
        return ResponseEntity.ok(response);
    }

    // Cập nhật ServiceItem
    @PutMapping("/{id}")
    public ResponseEntity<ServiceItemResponseDTO> updateServiceItem(
            @PathVariable String id,
            @Valid @RequestBody ServiceItemRequestDTO dto) {
        ServiceItemResponseDTO response = serviceItemService.updateServiceItem(id, dto);
        return ResponseEntity.ok(response);
    }

    // Xóa ServiceItem
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteServiceItem(@PathVariable String id) {
        serviceItemService.deleteServiceItem(id);
        return ResponseEntity.noContent().build();
    }
}
