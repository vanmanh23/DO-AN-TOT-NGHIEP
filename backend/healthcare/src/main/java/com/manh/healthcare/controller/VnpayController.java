package com.manh.healthcare.controller;


import com.manh.healthcare.dtos.PaymentRequestDTO;
import com.manh.healthcare.dtos.PaymentResponseDTO;
import com.manh.healthcare.dtos.VnpayRequest;
import com.manh.healthcare.entity.EPaymentStatus;
import com.manh.healthcare.service.PaymentService;
import com.manh.healthcare.service.VnpayService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/vnpay")
@AllArgsConstructor
public class VnpayController {
    @Autowired
    private VnpayService vnpayService;
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("")
    public String submidOrder(@RequestParam("amount") int orderTotal,
                              @RequestParam("orderInfo") String orderInfo,
                              HttpServletRequest request){
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String vnpayUrl = vnpayService.createOrder(orderTotal, orderInfo, baseUrl);
        return vnpayUrl;
    }
//    @GetMapping("/return")
//    public String returnPayment(HttpServletRequest request)  throws ServletException, IOException {
//        int paymentStatus = vnpayService.handlePaymentReturn(request);
//        String orderInfo = request.getParameter("vnp_OrderInfo");
//        PaymentResponseDTO payment = paymentService.getPaymentById(orderInfo);
//        payment.setStatus(EPaymentStatus.valueOf("PAID"));
//        PaymentRequestDTO paymentRequest = modelMapper.map(payment, PaymentRequestDTO.class);
//        PaymentResponseDTO paymentResponseDTO = paymentService.updatePayment(orderInfo, paymentRequest);
//        return  paymentStatus == 1 ? "payment_success" : "payment_fail";
//    }
}