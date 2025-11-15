package com.manh.healthcare.service;

import com.manh.healthcare.dtos.*;
import com.manh.healthcare.entity.*;
import com.manh.healthcare.repository.OrderRepository;
import com.manh.healthcare.repository.PatientRepository;
import com.manh.healthcare.repository.ServiceItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private PatientRepository patientRepository;
//    @Autowired
//    private StudyRepository studyRepository;
    @Autowired
    private ServiceItemRepository serviceItemRepository;


    public Page<OrderDTO> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable).map(this::convertToDTO);
    }

    public OrderDTO getOrderById(String orderId) {
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order không tồn tại với ID: " + orderId));
        return convertToDTO(order);
    }

//    public List<OrderDTO> getOrdersByPatientId(String patientId) {
//        return orderRepository.findByPatient_PatientId(patientId)
//                .map(this::convertToDTO);
//    }

//    @Transactional(readOnly = true)
//    public Page<OrderDTO> getOrdersByStatus(EOrderStatus status, Pageable pageable) {
//        return orderRepository.findByStatus(status, pageable)
//                .map(this::convertToDTO);
//    }

    public OrderDTO createOrder(OrderCreateRequest request) {
        // Validate patient
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient không tồn tại với ID: " + request.getPatientId()));

        Orders order = new Orders();
        order.setPriority(request.getPriority());
        order.setStatus(request.getStatus());
        order.setCreatedAt(LocalDateTime.now());
        order.setScheduledAt(request.getScheduledAt());
        order.setPatient(patient);

        // Set study nếu có
//        if (request.getStudyId() != null) {
//            Study study = studyRepository.findById(request.getStudyId())
//                    .orElseThrow(() -> new RuntimeException("Study không tồn tại với ID: " + request.getStudyId()));
//            order.setStudies(study);
//        }

        // Add service items nếu có
        if (request.getServiceItemIds() != null && !request.getServiceItemIds().isEmpty()) {
            Set<ServiceItem> serviceItems = new HashSet<>();
            for (String itemId : request.getServiceItemIds()) {
                ServiceItem item = serviceItemRepository.findById(itemId)
                        .orElseThrow(() -> new RuntimeException("ServiceItem không tồn tại với ID: " + itemId));
                item.setOrder(order);
                serviceItems.add(item);
            }
            order.setServiceItems(serviceItems);
        }

        Orders savedOrder = orderRepository.save(order);
        return convertToDTO(savedOrder);
    }

    public OrderDTO updateOrder(String orderId, OrdersRequestDTO request) {
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order không tồn tại với ID: " + orderId));

        if (request.getPriority() != null) {
            order.setPriority(request.getPriority());
        }
        if (request.getStatus() != null) {
            order.setStatus(request.getStatus());
            // Tự động set completedAt khi status là COMPLETED
            if (request.getStatus() == EOrderStatus.COMPLETED && order.getCompletedAt() == null) {
                order.setCompletedAt(LocalDateTime.now());
            }
        }
        if (request.getScheduledAt() != null) {
            order.setScheduledAt(request.getScheduledAt());
        }
        if (request.getCompletedAt() != null) {
            order.setCompletedAt(request.getCompletedAt());
        }

        if (request.getServiceItemIds() != null) {

            // 1) Xóa item cũ
            order.getServiceItems().clear();
            // 2) Lấy item mới từ DB
            List<ServiceItem> newItems = serviceItemRepository.findAllById(request.getServiceItemIds());
            // 3) Set quan hệ 2 chiều
            newItems.forEach(item -> item.setOrder(order));
            // 4) Thêm lại vào collection
            order.getServiceItems().addAll(newItems);
        }

        Orders updatedOrder = orderRepository.save(order);
        return convertToDTO(updatedOrder);
    }


    public void deleteOrder(String orderId) {
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order không tồn tại với ID: " + orderId));
        orderRepository.delete(order);
    }

    private OrderDTO convertToDTO(Orders order) {
        OrderDTO dto = new OrderDTO();
        dto.setOrderId(order.getOrderId());
        dto.setPriority(order.getPriority());
        dto.setStatus(order.getStatus());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setScheduledAt(order.getScheduledAt());
        dto.setCompletedAt(order.getCompletedAt());

        if (order.getPatient() != null) {
            dto.setPatientId(order.getPatient().getID());
            dto.setPatientName(order.getPatient().getName());
        }

//        if (order.getStudies() != null) {
//            dto.setStudyId(order.getStudies().getId());
//        }

        if (order.getServiceItems() != null) {
            dto.setServiceItems(order.getServiceItems().stream()
                    .map(item -> {
                        ServiceItemResponseDTO itemDTO = new ServiceItemResponseDTO();
                        itemDTO.setId(item.getId());
                        itemDTO.setServiceName(item.getServiceName());
                        itemDTO.setServiceCode(item.getServiceCode());
                        itemDTO.setUnitPrice(item.getUnitPrice());
                        return itemDTO;
                    })
                    .collect(Collectors.toSet()));
        }

        return dto;
    }
}
