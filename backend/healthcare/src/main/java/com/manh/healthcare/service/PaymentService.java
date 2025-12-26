package com.manh.healthcare.service;

import com.manh.healthcare.dtos.MonthlyRevenueDTO;
import com.manh.healthcare.dtos.PatientDTO;
import com.manh.healthcare.dtos.PaymentRequestDTO;
import com.manh.healthcare.dtos.PaymentResponseDTO;
import com.manh.healthcare.entity.*;
import com.manh.healthcare.repository.OrderRepository;
import com.manh.healthcare.repository.PatientRepository;
import com.manh.healthcare.repository.PaymentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private ModelMapper modelMapper;

    public PaymentResponseDTO createPayment(PaymentRequestDTO dto) {
        Orders order = orderRepository.findById(dto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

//        double totalAmount = calculateTotalPaymentByPatientId(patient);

        double totalAmount = order.getServiceItems()
                .stream()
                .mapToDouble(ServiceItem::getUnitPrice)
                .sum();

        Payment payment = new Payment();
        payment.setAmount(totalAmount);
        payment.setStatus(dto.getStatus());
        payment.setCreatedAt(dto.getCreatedAt());
        payment.setPaidAt(dto.getPaidAt());
        payment.setMethod(dto.getMethod());
        payment.setOrder(order);
        payment.setPatient(patient);

        paymentRepository.save(payment);

        return modelMapper.map(payment, PaymentResponseDTO.class);
    }

//    public PaymentResponseDTO updateTotalAmount(PatientDTO patientDTO) {
//        Payment payment = paymentRepository.findById(patientDTO.getPaymentIds())
//                .orElseThrow(() -> new RuntimeException("Payment not found"));
//
//        Patient patient = patientRepository.findById(dto.getPatientId())
//                .orElseThrow(() -> new RuntimeException("Patient not found"));
//
//        double totalAmount = order.getServiceItems()
//                .stream()
//                .mapToDouble(ServiceItem::getUnitPrice)
//                .sum();
//    }

    public double calculateTotalPaymentByPatientId(Patient patient) {
        List<Orders> orders = patient.getOrders();

        return orders.stream()
                .filter(o -> o.getServiceItems() != null)
                .flatMap(o -> o.getServiceItems().stream())
                .mapToDouble(ServiceItem::getUnitPrice)
                .sum();
    }

    public PaymentResponseDTO getPaymentById(String id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        return modelMapper.map(payment, PaymentResponseDTO.class);
    }

    public List<PaymentResponseDTO> getAllPayments() {
        return paymentRepository.findAll()
                .stream()
                .map(item -> modelMapper.map(item, PaymentResponseDTO.class))
                .collect(Collectors.toList());
    }

    public PaymentResponseDTO updatePayment(String id, PaymentRequestDTO dto) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        Orders order = orderRepository.findById(dto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        double totalAmount = order.getServiceItems()
                .stream()
                .mapToDouble(ServiceItem::getUnitPrice)
                .sum();

        payment.setAmount(totalAmount);
        payment.setStatus(dto.getStatus());
        payment.setCreatedAt(dto.getCreatedAt());
        payment.setPaidAt(dto.getPaidAt());
        payment.setMethod(dto.getMethod());
        payment.setOrder(order);
        payment.setPatient(patient);

        paymentRepository.save(payment);

        return modelMapper.map(payment, PaymentResponseDTO.class);
    }

    public void deletePayment(String id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        paymentRepository.delete(payment);
    }

    public PaymentResponseDTO changePaymentStatus(String id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        payment.setStatus(EPaymentStatus.PAID);
        payment.setMethod(EPaymentMethod.CASH);
        payment.setPaidAt(LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh")));
        paymentRepository.save(payment);

        return  modelMapper.map(payment, PaymentResponseDTO.class);
    }

    public List<MonthlyRevenueDTO> monthlyRevenue() {
        List<MonthlyRevenueDTO> monthlyRevenueDTOList = paymentRepository.getMonthlyRevenue();
        return  monthlyRevenueDTOList;
    }
}
