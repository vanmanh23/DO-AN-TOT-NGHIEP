package com.manh.healthcare.service;

import com.itextpdf.io.font.PdfEncodings;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.UnitValue;
import com.itextpdf.layout.property.VerticalAlignment;
import com.manh.healthcare.dtos.NutritionInfo;
import com.manh.healthcare.dtos.OrderDTO;
import com.manh.healthcare.dtos.ReportResultsRequestDTO;
import com.manh.healthcare.dtos.ReportResultsResponseDTO;
import com.manh.healthcare.entity.Orders;
import com.manh.healthcare.entity.ReportResults;
import com.manh.healthcare.repository.OrderRepository;
import com.manh.healthcare.repository.ReportResultsRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReportResultsService {
    @Autowired
    private ReportResultsRepository reportResultsRepository;
    @Autowired
    private OrderRepository ordersRepository;
    @Autowired
    private ModelMapper modelMapper;

    public ReportResultsResponseDTO createReportResult(ReportResultsRequestDTO dto) throws IOException {
        // Check if order exists
        Orders order = ordersRepository.findById(dto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + dto.getOrderId()));

        // Check if report already exists for this order
        if (reportResultsRepository.existsByOrderOrderId(dto.getOrderId())) {
            throw new RuntimeException("Report result already exists for order id: " + dto.getOrderId());
        }
        byte[] image = generateImagePdf(dto);
        ReportResults reportResult = toEntity(dto);
        reportResult.setOrder(order);
        reportResult.setPdf_report(image);

        ReportResults saved = reportResultsRepository.save(reportResult);
        return toDTO(saved);
    }

    public ReportResultsResponseDTO updateReportResult(String id, ReportResultsRequestDTO dto) throws IOException {
        ReportResults existing = reportResultsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Report result not found with id: " + id));

        existing.setDescription(dto.getDescription());
        existing.setConclusion(dto.getConclusion());
        existing.setSuggestion(dto.getSuggestion());

        byte[] image = generateImagePdf(dto);
        existing.setPdf_report(image);

        // Update order if provided and different
        if (dto.getOrderId() != null && !dto.getOrderId().equals(existing.getOrder().getOrderId())) {
            Orders order = ordersRepository.findById(dto.getOrderId())
                    .orElseThrow(() -> new RuntimeException("Order not found with id: " + dto.getOrderId()));
            existing.setOrder(order);
        }

        ReportResults updated = reportResultsRepository.save(existing);
        return toDTO(updated);
    }

    @Transactional
    public ReportResultsResponseDTO getReportResultById(String id) {
        ReportResults reportResult = reportResultsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Report result not found with id: " + id));
        return toDTO(reportResult);
    }

    @Transactional
    public ReportResultsResponseDTO getReportResultByOrderId(String orderId) {
        ReportResults reportResult = reportResultsRepository.findReportByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Report result not found for order id: " + orderId));
        return toDTO(reportResult);
    }

    @Transactional
    public List<ReportResultsResponseDTO> getAllReportResults() {
        return reportResultsRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public void deleteReportResult(String id) {
        if (!reportResultsRepository.existsById(id)) {
            throw new RuntimeException("Report result not found with id: " + id);
        }
        reportResultsRepository.deleteById(id);
    }

    // Mapper methods
    private ReportResultsResponseDTO toDTO(ReportResults entity) {
//        ReportResultsResponseDTO dto = new ReportResultsResponseDTO();
//        dto.setId(entity.getId());
//        dto.setDescription(entity.getDescription());
//        dto.setConclusion(entity.getConclusion());
//        dto.setSuggestion(entity.getSuggestion());
        ReportResultsResponseDTO reportResultsResponseDTO = modelMapper.map(entity, ReportResultsResponseDTO.class);
//        OrderDTO orderDTO = modelMapper.map(entity.getOrder(), OrderDTO.class);
//        dto.setOrder(orderDTO);
        return reportResultsResponseDTO;
    }

    private ReportResults toEntity(ReportResultsRequestDTO dto) {
        ReportResults entity = new ReportResults();
//        entity.setId(dto.getId());
        entity.setDescription(dto.getDescription());
        entity.setConclusion(dto.getConclusion());
        entity.setSuggestion(dto.getSuggestion());
        return entity;
    }

    private byte[] generateImagePdf(ReportResultsRequestDTO requestDTO) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter writer = new PdfWriter(out);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            Orders order = ordersRepository.findById(requestDTO.getOrderId())
                    .orElseThrow(() -> new RuntimeException("Order not found with id: " + requestDTO.getOrderId()));
            ;

            document.add(new Paragraph("RESULTS")
                    .setTextAlignment(TextAlignment.CENTER)
                    .setBold()
                    .setFontSize(18)
                    .setMarginBottom(20));

            // Tạo bảng lớn với 2 cột: 1 cột cho thông tin, 1 cột cho hình ảnh
            UnitValue[] mainBlockColumnWidths = {UnitValue.createPercentValue(60), UnitValue.createPercentValue(40)};
            Table mainBlockTable = new Table(mainBlockColumnWidths);
            mainBlockTable.setWidth(UnitValue.createPercentValue(100));
            mainBlockTable.setMarginBottom(20);
            mainBlockTable.setBorder(Border.NO_BORDER); // Bỏ viền bảng chính

            // --- Ô 1: Thông tin bệnh nhân (Bên trái) ---
            Cell patientInfoCell = new Cell().setBorder(Border.NO_BORDER);

            // Tạo bảng con để sắp xếp thông tin bệnh nhân (2 cột: label, value)
            UnitValue[] patientInfoTableWidths = {UnitValue.createPercentValue(30), UnitValue.createPercentValue(70)};
            Table patientInfoTable = new Table(patientInfoTableWidths);
            patientInfoTable.setWidth(UnitValue.createPercentValue(100));
            patientInfoTable.setBorder(Border.NO_BORDER); // Bỏ viền bảng thông tin bệnh nhân

            // Thêm các dòng thông tin vào bảng con
            addPatientInfoRow(patientInfoTable, "Full Name:", order.getPatient().getName(), true);
            addPatientInfoRow(patientInfoTable, "Year of Birth:", String.valueOf(order.getPatient().getBirthdate()), false);
            addPatientInfoRow(patientInfoTable, "Gender:", String.valueOf(order.getPatient().getGender()), false);
            addPatientInfoRow(patientInfoTable, "Patient ID:", order.getPatient().getID(), false);
            addPatientInfoRow(patientInfoTable, "Address:", order.getPatient().getAddress(), false);
            addPatientInfoRow(patientInfoTable, "Ordered By:", order.getDoctor().getPerson().getFullName(), false);
            addPatientInfoRow(patientInfoTable, "Machine:", order.getServiceItems().stream().findFirst().map(item -> item.getModality().getModel()).orElse(null), false);
            addPatientInfoRow(patientInfoTable, "Diagnosis:", requestDTO.getConclusion(), false);

            patientInfoCell.add(patientInfoTable);
            mainBlockTable.addCell(patientInfoCell);

            // --- Ô 2: Hình ảnh siêu âm (Bên phải) ---
            Cell imageCell = new Cell().setBorder(Border.NO_BORDER);

            String imageUrl = "http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs/studies/"
                    + requestDTO.getStudyUID() + "/series/" + requestDTO.getSeriesUID() + "/instances/"
                    + requestDTO.getInstances() + "/rendered";
            try {
                Image image = new Image(ImageDataFactory.create(imageUrl))
                        .setAutoScale(true) // Tự động co giãn để vừa ô
                        .setTextAlignment(TextAlignment.CENTER);
//                        .setVerticalAlignment(VerticalAlignment.MIDDLE);
                imageCell.add(image);
            } catch (MalformedURLException e) {
                imageCell.add(new Paragraph("Image could not be loaded.").setFontColor(ColorConstants.RED));
            }
            mainBlockTable.addCell(imageCell);

            document.add(mainBlockTable); // Thêm bảng chính vào document

            document.add(new Paragraph(String.valueOf(order.getServiceItems().stream().findFirst().map(item -> item.getServiceName())))
                    .setBold()
                    .setFontSize(14)
                    .setMarginBottom(10));

            // Bảng 2 cột cho Mô tả, Kết luận, Đề nghị
            UnitValue[] detailTableWidths = {UnitValue.createPercentValue(50), UnitValue.createPercentValue(50)};
            Table detailTable = new Table(detailTableWidths);
            detailTable.setWidth(UnitValue.createPercentValue(100));
            detailTable.setBorder(Border.NO_BORDER); // Bỏ viền bảng chi tiết

            // Ô Mô tả
            Cell moTaCell = new Cell().setBorder(Border.NO_BORDER)
                    .add(new Paragraph("Description:").setBold())
                    .add(new Paragraph(requestDTO.getDescription()))
                    .add(new Paragraph(" ")); // Thêm khoảng trắng cho bố cục

            // Ô Kết luận
            Cell ketLuanCell = new Cell().setBorder(Border.NO_BORDER)
                    .add(new Paragraph("Conclusion:").setBold())
                    .add(new Paragraph(requestDTO.getConclusion()));

            detailTable.addCell(moTaCell);
            detailTable.addCell(ketLuanCell);

            // Ô Đề nghị (dùng colspan 2 để chiếm cả 2 cột)
            Cell deNghiCell = new Cell(1, 2) // Colspan 2
                    .setBorder(Border.NO_BORDER)
                    .add(new Paragraph("Suggestion:").setBold())
                    .add(new Paragraph(requestDTO.getSuggestion()));
            detailTable.addCell(deNghiCell);

            document.add(detailTable);

            // =========================================================
            // 5. NUTRITIONAL GUIDANCE
            // =========================================================
            NutritionInfo nutrition = parseNutrition(requestDTO.getAiNutriRecommen());
            Table nutritionTable = new Table(UnitValue.createPercentArray(new float[]{33, 33, 33}));
            nutritionTable.setWidth(UnitValue.createPercentValue(100));
            nutritionTable.setMarginTop(20);
            nutritionTable.setBorder(Border.NO_BORDER);

            Cell c1 = new Cell().setBorder(Border.NO_BORDER);
            c1.add(new Paragraph("NUTRITIONAL GUIDANCE").setBold());

            for (String g : nutrition.guidance) {
                c1.add(new Paragraph("• " + g));
            }

            nutritionTable.addCell(c1);

            Cell c2 = new Cell().setBorder(Border.NO_BORDER);
            c2.add(new Paragraph("RECOMMENDED FOODS").setBold());

            for (String r : nutrition.recommendedFoods) {
                c2.add(new Paragraph("• " + r));
            }

            nutritionTable.addCell(c2);

            Cell c3 = new Cell().setBorder(Border.NO_BORDER);
            c3.add(new Paragraph("FOODS TO AVOID").setBold());

            for (String a : nutrition.foodsToAvoid) {
                c3.add(new Paragraph("• " + a));
            }

            nutritionTable.addCell(c3);

            // Add to PDF
            document.add(nutritionTable);


            // =========================================================
            // 4. CHỮ KÝ / NGÀY THÁNG (Góc dưới bên phải)
            // =========================================================
            // Để căn chỉnh sang phải, dùng một bảng 1 cột
            float[] pointColumnWidths = {100};
            Table signatureTable = new Table(pointColumnWidths);
            signatureTable.setWidth(UnitValue.createPercentValue(100));
            signatureTable.setBorder(Border.NO_BORDER);
            signatureTable.setMarginTop(50); // Khoảng cách từ nội dung phía trên

            // Lấy ngày hiện tại
            LocalDate currentDate = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd 'tháng' MM yyyy", new Locale("vi", "VN"));
            String formattedDate = currentDate.format(formatter);

            signatureTable.addCell(new Cell().setBorder(Border.NO_BORDER)
                    .add(new Paragraph("Date " + formattedDate)
                            .setTextAlignment(TextAlignment.RIGHT)));
            signatureTable.addCell(new Cell().setBorder(Border.NO_BORDER)
                    .add(new Paragraph("DOCTOR")
                            .setTextAlignment(TextAlignment.RIGHT)
                            .setBold())
                    .setMarginTop(10)); // Khoảng cách sau ngày
            // Có thể thêm dòng ký tên nếu cần

            document.add(signatureTable);

            // =========================================================
            // ĐÓNG DOCUMENT
            // =========================================================
            document.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error generating PDF: " + e.getMessage());
        }

        return out.toByteArray();
    }

    private void addPatientInfoRow(Table table, String label, String value, boolean boldValue) {
        // Ô Label (In đậm)
        table.addCell(new Cell().setBorder(Border.NO_BORDER).add(new Paragraph(label).setBold()));

        // Ô Value
        Paragraph valueParagraph = new Paragraph(value);
        if (boldValue) {
            valueParagraph.setBold();
        }
        table.addCell(new Cell().setBorder(Border.NO_BORDER).add(valueParagraph));
    }

    private Cell makeCell(String text) {
        return new Cell()
                .add(new Paragraph(text))
                .setBorder(null)
                .setFontSize(12);
    }

    private byte[] downloadImage(String url) throws IOException {
        HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();
        conn.setRequestProperty("Accept", "image/jpeg");

        try (InputStream in = conn.getInputStream();
             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

            in.transferTo(baos);
            return baos.toByteArray();
        }
    }

    public NutritionInfo parseNutrition(String input) {
        List<String> guidance = new ArrayList<>();
        List<String> recommended = new ArrayList<>();
        List<String> avoid = new ArrayList<>();

        String currentSection = "";

        // Tách theo khoảng trắng nhưng giữ cấu trúc
        String[] tokens = input.split("\\s+");

        StringBuilder buffer = new StringBuilder();

        for (String token : tokens) {
            if (token.equalsIgnoreCase("NUTRITIONAL") || token.contains("NUTRITIONAL")) {
                currentSection = "guidance";
                continue;
            }
            if (token.startsWith("GUIDANCE:")) continue;

            if (token.equalsIgnoreCase("RECOMMENDED") || token.contains("RECOMMENDED")) {
                currentSection = "recommended";
                continue;
            }
            if (token.startsWith("FOODS:")) continue;

            if (token.equalsIgnoreCase("FOODS") || token.contains("FOODS") ||
                    token.equalsIgnoreCase("AVOID:") || token.contains("AVOID:") || token.equalsIgnoreCase("AVOID")) {
                currentSection = "avoid";
                continue;
            }

            // NẾU GẶP CÂU MỚI → LƯU
            if (token.matches("^\\d+\\.$") || token.equals("-")) {
                if (buffer.length() > 0) {
                    addToSection(currentSection, buffer.toString(), guidance, recommended, avoid);
                    buffer.setLength(0);
                }
                continue;
            }

            buffer.append(token).append(" ");
        }

        if (buffer.length() > 0) {
            addToSection(currentSection, buffer.toString(), guidance, recommended, avoid);
        }

        return new NutritionInfo(guidance, recommended, avoid);
    }

    private void addToSection(String section, String text,
                              List<String> g, List<String> r, List<String> f) {
        text = text.trim();
        if (text.isEmpty()) return;

        switch (section) {
            case "guidance": g.add(text); break;
            case "recommended": r.add(text); break;
            case "avoid": f.add(text); break;
        }
    }

}
