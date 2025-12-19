package com.manh.healthcare.service;

import com.itextpdf.io.source.ByteArrayOutputStream;
import com.manh.healthcare.dtos.OrderDTO;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class MailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendMail(String to, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);
        message.setFrom("manhnguyen23012003@gmail.com");

        mailSender.send(message);
    }

    public void sendInvoiceEmail(String to, byte[] pdf) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject("Your Medical Invoice");
            helper.setText("Please find attached your invoice.", false);
            helper.addAttachment("invoice.pdf",
                    new ByteArrayResource(pdf));

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public byte[] htmlToPdf(String html) {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.withHtmlContent(html, null);
            builder.toStream(out);
            builder.run();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //    public String buildInvoiceHtml(OrderDTO order) {
//        String itemsHtml = order.getServiceItems().stream()
//                .map(item -> """
//                    <tr>
//                        <td>%s</td>
//                        <td>%s</td>
//                        <td align="right">%s VND</td>
//                    </tr>
//                """.formatted(
//                        item.getServiceName(),
//                        item.getServiceCode(),
//                        item.getUnitPrice()
//                ))
//                .toList()
//                .toString();
//
//        return """
//        <html>
//        <body style="font-family:Arial">
//            <h1>INVOICE</h1>
//            <p>Patient: %s</p>
//            <p>Date: %s</p>
//
//            <table border="1" width="100%%">
//                <tr>
//                    <th>Service</th>
//                    <th>Code</th>
//                    <th>Price</th>
//                </tr>
//                %s
//            </table>
//
//            <h3>Total: %s VND</h3>
//        </body>
//        </html>
//        """.formatted(
//                order.getPatient().getPatientName(),
//                order.getPayment().getPaidAt(),
//                itemsHtml,
//                order.getPayment().getAmount()
//        );
//    }
    public String buildInvoiceHtml(OrderDTO order) {

        String itemsHtml = order.getServiceItems().stream()
                .map(item -> """
                            <tr>
                                <td style="padding:8px">%s</td>
                                <td style="padding:8px">%s</td>
                                <td style="padding:8px; text-align:right">%s VND</td>
                            </tr>
                        """.formatted(
                        item.getServiceName(),
                        item.getServiceCode(),
                        String.format("%,d", item.getUnitPrice())
                ))
                .collect(Collectors.joining());

        return """
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f6f8;
                            padding: 20px;
                        }
                        .invoice-container {
                            max-width: 700px;
                            margin: auto;
                            background: #ffffff;
                            padding: 24px;
                            border-radius: 8px;
                        }
                        .header {
                            text-align: center;
                            border-bottom: 2px solid #1e88e5;
                            padding-bottom: 10px;
                            margin-bottom: 20px;
                        }
                        .header h1 {
                            color: #1e88e5;
                            margin: 0;
                        }
                        .info {
                            margin-bottom: 20px;
                        }
                        .info p {
                            margin: 4px 0;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th {
                            background-color: #1e88e5;
                            color: white;
                            padding: 10px;
                            text-align: left;
                        }
                        td {
                            border-bottom: 1px solid #e0e0e0;
                        }
                        .total {
                            text-align: right;
                            font-size: 18px;
                            margin-top: 20px;
                            font-weight: bold;
                        }
                        .footer {
                            margin-top: 30px;
                            font-size: 12px;
                            color: #777;
                            text-align: center;
                        }
                    </style>
                </head>

                <body>
                    <div class="invoice-container">

                        <div class="header">
                            <h1>HÓA ĐƠN THANH TOÁN</h1>
                        </div>

                        <div class="info">
                            <p><b>Bệnh nhân:</b> %s</p>
                            <p><b>Ngày thanh toán:</b> %s</p>
                        </div>

                        <table>
                            <tr>
                                <th>Dịch vụ</th>
                                <th>Mã DV</th>
                                <th style="text-align:right">Đơn giá</th>
                            </tr>
                            %s
                        </table>

                        <div class="total">
                            Tổng tiền: %s VND
                        </div>

                        <div class="footer">
                            Cảm ơn Quý khách đã sử dụng dịch vụ của chúng tôi.<br/>
                            Chúc Quý khách sức khỏe!
                        </div>

                    </div>
                </body>
                </html>
                """.formatted(
                order.getPatient().getPatientName(),
                order.getPayment().getPaidAt(),
                itemsHtml,
                String.format("%,d", order.getPayment().getAmount())
        );
    }

}
