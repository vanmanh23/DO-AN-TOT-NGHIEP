package com.manh.healthcare.controller;

import com.manh.healthcare.dtos.ServiceItemRequestDTO;
import com.manh.healthcare.dtos.ServiceItemResponseDTO;
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

    // Lấy tất cả ServiceItem
    @GetMapping
    public ResponseEntity<List<ServiceItemResponseDTO>> getAllServiceItems() {
        List<ServiceItemResponseDTO> response = serviceItemService.getAllServiceItems();
        return ResponseEntity.ok(response);
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
