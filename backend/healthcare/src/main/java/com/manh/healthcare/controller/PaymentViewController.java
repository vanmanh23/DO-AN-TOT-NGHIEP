package com.manh.healthcare.controller;

import com.manh.healthcare.dtos.PaymentRequestDTO;
import com.manh.healthcare.dtos.PaymentResponseDTO;
import com.manh.healthcare.entity.EPaymentMethod;
import com.manh.healthcare.entity.EPaymentStatus;
import com.manh.healthcare.service.PaymentService;
import com.manh.healthcare.service.VnpayService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Controller
@RequestMapping("/api/vnpay")
@AllArgsConstructor
public class PaymentViewController {
    @Autowired
    private VnpayService vnpayService;
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private ModelMapper modelMapper;
    @GetMapping("/return")
    public String returnPayment(HttpServletRequest request, Model model)  throws ServletException, IOException {
        int paymentStatus = vnpayService.handlePaymentReturn(request);
        String paymentId = request.getParameter("vnp_OrderInfo");
        if (paymentId == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        PaymentResponseDTO payment = paymentService.getPaymentById(paymentId);
        payment.setStatus(EPaymentStatus.valueOf("PAID"));
        payment.setMethod(EPaymentMethod.VNPAY);
        payment.setPaidAt(LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh")));
        PaymentRequestDTO paymentRequest = modelMapper.map(payment, PaymentRequestDTO.class);
        PaymentResponseDTO paymentResponseDTO = paymentService.updatePayment(paymentId, paymentRequest);

        model.addAttribute("paymentId", paymentId);
        model.addAttribute("totalPrice", paymentResponseDTO.getAmount());
        model.addAttribute("paymentTime", paymentResponseDTO.getPaidAt());
        model.addAttribute("paymentMethod", paymentResponseDTO.getMethod());

        return  paymentStatus == 1 ? "payment_success" : "payment_fail";
    }
}
