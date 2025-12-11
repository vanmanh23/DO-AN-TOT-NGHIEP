package com.manh.healthcare.service;

import com.manh.healthcare.dtos.*;
import com.manh.healthcare.entity.*;
import com.manh.healthcare.repository.DoctorRepository;
import com.manh.healthcare.repository.OrderRepository;
import com.manh.healthcare.repository.PatientRepository;
import com.manh.healthcare.repository.ServiceItemRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private ModelMapper modelMapper;
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
        if (request.getDoctorId() != null) {
            Doctor doctor = doctorRepository.findById(request.getDoctorId())
                    .orElseThrow(() -> new RuntimeException("doctor không tồn tại với ID: " + request.getDoctorId()));
            order.setDoctor(doctor);
        }
        // Add service items nếu có
        if (request.getServiceItemIds() != null && !request.getServiceItemIds().isEmpty()) {
            Set<ServiceItem> serviceItems =
                    new HashSet<>(serviceItemRepository.findAllById(request.getServiceItemIds()));
            order.setServiceItems(serviceItems);
        }

        Orders savedOrder = orderRepository.save(order);
        return convertToDTO(savedOrder);
    }
public OrderDTO updateOrder(String orderId, OrdersRequestDTO request) {

    // 1. Tìm order
    Orders order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));

    // 2. Update các field cơ bản
    order.setPriority(request.getPriority());
    order.setStatus(request.getStatus());
    order.setScheduledAt(request.getScheduledAt());
    order.setCompletedAt(request.getCompletedAt());
//    order.setStudyId(request.getStudyId());

    if (request.getDoctorId() != null) {
        Doctor doctor = doctorRepository.getDoctorById(request.getDoctorId());
        order.setDoctor(doctor);
    }
    // 3. Update Service Items
    if (request.getServiceItemIds() != null) {

        // Lấy danh sách service item mới
        Set<ServiceItem> newItems =
                new HashSet<>(serviceItemRepository.findAllById(request.getServiceItemIds()));

        // Gán lại trực tiếp (Hibernate tự clear bảng trung gian)
        order.setServiceItems(newItems);
    }

    // 4. Lưu vào DB
    Orders saved = orderRepository.save(order);

    // 5. Convert sang DTO
    return convertToDTO(saved);
}


    public void deleteOrder(String orderId) {
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order không tồn tại với ID: " + orderId));
        orderRepository.delete(order);
    }

    public OrderDTO findById(String id) {
        Orders order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order không tồn tại với ID: " + id));
        return convertToDTO(order);
    }

    public void changeStatus(EOrderStatus new_status, String orderId) {
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));

        order.setStatus(new_status);
        order.setCompletedAt(LocalDateTime.now());
        orderRepository.save(order);
        return;
    }

    public List<OrderDTO> findByStatus(EOrderStatus status) {
        List<Orders> order = orderRepository.findByStatus(status);
        List<OrderDTO> orderDTOS = order.stream().map(this::convertToDTO).toList();
        return orderDTOS;
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
            dto.setPatientBirthday(order.getPatient().getBirthdate());
        }

        if (order.getPayment() != null) {
            PaymentResponseDTO paymentResponseDTO = modelMapper.map(order.getPayment(), PaymentResponseDTO.class);
            dto.setPayment(paymentResponseDTO);
        }

        if (order.getStudy() != null) {
            StudyDTO study = modelMapper.map(order.getStudy(), StudyDTO.class);
            dto.setStudy(study);
        }
        if (order.getDoctor() != null) {
            DoctorResponseDTO doctorResponseDTO = new DoctorResponseDTO();
            doctorResponseDTO.setId(order.getDoctor().getId());
            doctorResponseDTO.setFullName(order.getDoctor().getPerson().getFullName());
            doctorResponseDTO.setDateOfBirth(order.getDoctor().getPerson().getDateOfBirth());
            doctorResponseDTO.setGender(order.getDoctor().getPerson().getGender());
            doctorResponseDTO.setPhoneNumber(order.getDoctor().getPerson().getPhoneNumber());
            doctorResponseDTO.setEmail(order.getDoctor().getPerson().getEmail());
            doctorResponseDTO.setAddress(order.getDoctor().getPerson().getAddress());
            doctorResponseDTO.setDoctorCode(order.getDoctor().getDoctorCode());
            doctorResponseDTO.setSpecialization(order.getDoctor().getSpecialization());
            doctorResponseDTO.setDegree(order.getDoctor().getDegree());
            doctorResponseDTO.setYearsOfExperience(order.getDoctor().getYearsOfExperience());
            doctorResponseDTO.setClinicRoom(order.getDoctor().getClinicRoom());
            doctorResponseDTO.setStatus(order.getDoctor().getStatus());

            dto.setDoctor(doctorResponseDTO);

//            dto.setStudyId(order.getDoctor().getId());
        }

        if (order.getPatient() != null) {
            PatientResponseDTO patientResponseDTO = modelMapper.map(order.getPatient(), PatientResponseDTO.class);
            dto.setPatient(patientResponseDTO);
        }

        if (order.getServiceItems() != null) {
            dto.setServiceItems(order.getServiceItems().stream()
                    .map(item -> {
                        ServiceItemResponseDTO itemDTO = new ServiceItemResponseDTO();
                        ModalitiesDTO modalitiesDTO = modelMapper.map(item.getModality(), ModalitiesDTO.class);
                        itemDTO.setId(item.getId());
                        itemDTO.setServiceName(item.getServiceName());
                        itemDTO.setServiceCode(item.getServiceCode());
                        itemDTO.setUnitPrice(item.getUnitPrice());
                        itemDTO.setModality(modalitiesDTO);
                        return itemDTO;
                    })
                    .collect(Collectors.toSet()));
        }

        return dto;
    }
}
