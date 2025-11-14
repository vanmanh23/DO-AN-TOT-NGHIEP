package com.manh.healthcare.service;

import com.manh.healthcare.dtos.OrdersRequestDTO;
import com.manh.healthcare.dtos.OrdersResponseDTO;
import com.manh.healthcare.entity.EModality;
import com.manh.healthcare.entity.EPriority;
import com.manh.healthcare.entity.Orders;
import com.manh.healthcare.entity.Patient;
import com.manh.healthcare.repository.OrdersRepository;
import com.manh.healthcare.repository.PatientRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrdersService {
    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private ModelMapper modelMapper;
    public OrdersResponseDTO createOrder(OrdersRequestDTO request) {

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Orders order = modelMapper.map(request, Orders.class);

        order.setCreatedAt(LocalDateTime.now());
        order.setScheduledAt(request.getScheduledAt());

        Orders saved = ordersRepository.save(order);

        return new OrdersResponseDTO(
                saved.getOrderId(),
                saved.getPatient().getID(),
                saved.getPatient().getName(),
                saved.getModality(),
                saved.getPriority(),
                saved.getStatus(),
                saved.getCreatedAt(),
                saved.getScheduledAt(),
                saved.getCompletedAt()
        );
    }
//    public List<OrdersResponseDTO> findByModalityOrderByPriorityAndCreatedAt(String modality) {
//        List<Orders> orders = ordersRepository.findByModalityOrderByPriorityAndCreatedAt(modality);
//        List<OrdersResponseDTO> orderDTOs = orders.stream()
//                .map(order ->modelMapper.map(order, OrdersResponseDTO.class))
//                .collect(Collectors.toList());
//        return orderDTOs;
//    }
    // Service - sort trong Java
    public List<OrdersResponseDTO> findByModalityOrderByPriorityAndCreatedAt(EModality modality) {
        List<Orders> orders = ordersRepository.findByModality(modality);
        // Comparator để sort theo priority và createdAt
        Comparator<Orders> comparator = Comparator
                .comparing((Orders o) -> getPriorityOrder(o.getPriority()))
                .thenComparing(Orders::getCreatedAt);

        return orders.stream()
                .sorted(comparator)
                .map(order ->modelMapper.map(order, OrdersResponseDTO.class))
                .collect(Collectors.toList());
    }

    private int getPriorityOrder(EPriority priority) {
        if (priority == null) return 4;
        switch (priority) {
            case STAT: return 1;
            case URGENT: return 2;
            case ROUTINE: return 3;
            default: return 4;
        }
    }
}
