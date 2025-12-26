package com.manh.healthcare.controller;

import com.manh.healthcare.dtos.*;
import com.manh.healthcare.service.MailService;
import com.manh.healthcare.service.OrderService;
import com.manh.healthcare.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private MailService mailService;
    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<BaseResponse> createPayment(@RequestBody PaymentRequestDTO dto) {
        PaymentResponseDTO paymentResponseDTO = paymentService.createPayment(dto);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("payment.success.create", paymentResponseDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(baseResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getPayment(@PathVariable String id) {
        PaymentResponseDTO paymentResponseDTO = paymentService.getPaymentById(id);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("payment.success.findById", paymentResponseDTO);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @GetMapping
    public ResponseEntity<BaseResponse> getAllPayments() {
        List<PaymentResponseDTO> paymentResponseDTO = paymentService.getAllPayments();
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("payment.success.findAll", paymentResponseDTO);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updatePayment(
            @PathVariable String id,
            @RequestBody PaymentRequestDTO dto
    ) {
        PaymentResponseDTO paymentResponseDTO = paymentService.updatePayment(id, dto);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("payment.success.update", paymentResponseDTO);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<BaseResponse> changePaymentStatus(@PathVariable String id) {
        PaymentResponseDTO paymentResponseDTO = paymentService.changePaymentStatus(id);
        OrderDTO order = orderService.findById(paymentResponseDTO.getOrderId());
        if (order.getPatient().getGmail() != null){
            String html = mailService.buildInvoiceHtml(order);
            byte[] pdf = mailService.htmlToPdf(html);
            mailService.sendInvoiceEmail(
                    order.getPatient().getGmail(),
                    pdf
            );
        }
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("payment.success.changeStatus", paymentResponseDTO);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePayment(@PathVariable String id) {
        paymentService.deletePayment(id);
        return ResponseEntity.ok("Payment deleted successfully");
    }
    @GetMapping("/monthly_revenue")
    public ResponseEntity<BaseResponse> monthlyRevenue() {
        List<MonthlyRevenueDTO> monthlyRevenueDTOList = paymentService.monthlyRevenue();
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("payment.success.monthlyRevenue", monthlyRevenueDTOList);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }
}
