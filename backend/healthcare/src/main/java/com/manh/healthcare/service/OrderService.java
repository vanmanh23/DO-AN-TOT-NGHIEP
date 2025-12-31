package com.manh.healthcare.service;

import com.manh.healthcare.dtos.*;
import com.manh.healthcare.entity.*;
import com.manh.healthcare.repository.DoctorRepository;
import com.manh.healthcare.repository.OrderRepository;
import com.manh.healthcare.repository.PatientRepository;
import com.manh.healthcare.repository.ServiceItemRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
        order.setOrderCode(generateFormCode());

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
        Orders saved = orderRepository.save(order);
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

    public List<OrderDTO> findQueueByStatusOrder(EOrderStatus status) {
        List<Orders> order = orderRepository.findQueueByStatusOrderByPriority(status);
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
        dto.setOrderCode(order.getOrderCode());
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

    public List<DailyPatientCountDTO> getPatientCountLast7Days(
            LocalDate startDate,
            LocalDate endDate
    ) {
        List<Object[]> rawData = orderRepository.countPatientsByDate(
                startDate.atStartOfDay(),
                endDate.atTime(23, 59, 59)
        );

        // Map dữ liệu từ DB
        Map<LocalDate, Long> dataMap = new HashMap<>();
        for (Object[] row : rawData) {
            LocalDate date = ((java.sql.Date) row[0]).toLocalDate();
            Long total = ((Number) row[1]).longValue();
            dataMap.put(date, total);
        }

        // Formatter dd/MM
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM");

        // Fill đủ 7 ngày
        List<DailyPatientCountDTO> result = new ArrayList<>();
        LocalDate current = startDate;

        while (!current.isAfter(endDate)) {
            result.add(new DailyPatientCountDTO(
                    current.format(formatter),
                    dataMap.getOrDefault(current, 0L)
            ));
            current = current.plusDays(1);
        }

        return result;
    }

    @Transactional
    public String generateFormCode() {
        LocalDate today = LocalDate.now();
        String dateStr = today.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String prefix = "TC" + dateStr + "-";

        // Find the highest sequence number for today
        int sequenceNumber = getNextSequenceNumber(prefix);

        // Format: TC + YYYYMMDD + 3-digit sequence
        return String.format("%s%04d", prefix, sequenceNumber);
    }

    @Transactional
    private int getNextSequenceNumber(String prefix) {
        // Get all form codes that start with the prefix
        String lastFormCode = orderRepository.findAll().stream()
                .map(form -> form.getOrderCode())
                .filter(code -> code != null && code.startsWith(prefix))
                .max(String::compareTo)
                .orElse(null);

        if (lastFormCode == null) {
            return 1;
        }

        // Extract the sequence number from the last code
        try {
            String sequenceStr = lastFormCode.substring(prefix.length());
            int lastSequence = Integer.parseInt(sequenceStr);
            return lastSequence + 1;
        } catch (Exception e) {
            return 1;
        }
    }
}
