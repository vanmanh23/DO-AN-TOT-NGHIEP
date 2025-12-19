package com.manh.healthcare.controller;

import com.manh.healthcare.dtos.OrderDTO;
import com.manh.healthcare.entity.Orders;
import com.manh.healthcare.service.MailService;
import com.manh.healthcare.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mail")
public class MailController {
    @Autowired
    private MailService mailService;
    @Autowired
    private OrderService orderService;

    @GetMapping("/send")
    public String sendMail() {
        mailService.sendMail(
                "manhnv.21it@vku.udn.vn",
                "Test Email",
                "Hello from Spring Boot"
        );
        return "Sent!";
    }

    @PostMapping("/send-email/{orderId}")
    public void sendInvoice(@PathVariable String orderId) {

        OrderDTO order = orderService.findById(orderId);

        String html = mailService.buildInvoiceHtml(order);
        byte[] pdf = mailService.htmlToPdf(html);

        mailService.sendInvoiceEmail(
//                order.getPatient().getGmail(),
                "manhnv.21it@vku.udn.vn",
                pdf
        );
    }
}
