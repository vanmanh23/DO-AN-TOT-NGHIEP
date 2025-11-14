package com.manh.healthcare.controller;

import com.manh.healthcare.dtos.BaseResponse;
import com.manh.healthcare.dtos.OrdersRequestDTO;
import com.manh.healthcare.dtos.OrdersResponseDTO;
import com.manh.healthcare.entity.EModality;
import com.manh.healthcare.entity.Orders;
import com.manh.healthcare.service.OrdersService;
import com.manh.healthcare.service.PacsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrdersController {
    @Autowired
    private OrdersService ordersService;
    @Autowired
    private PacsService pacsService;
    @PostMapping
    public ResponseEntity<BaseResponse> createOrder(@RequestBody OrdersRequestDTO request) {
        OrdersResponseDTO response = ordersService.createOrder(request);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("orders.success.create", response);
        return ResponseEntity.status(200).body(baseResponse);
    }
    @GetMapping("/{modality}")
    public ResponseEntity<BaseResponse> findByModalityOrderByPriorityAndCreatedAt(@PathVariable EModality modality) {
        List<OrdersResponseDTO> orders = ordersService.findByModalityOrderByPriorityAndCreatedAt(modality);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("orders.success.findByModality", orders);
        return ResponseEntity.status(200).body(baseResponse);
    }
    @PostMapping("/dicom/upload")
    public ResponseEntity<?> uploadDicom(@RequestParam("file") MultipartFile[] file) {
//        ArrayList<Map<String, String>> listRespone = new ArrayList<Map<String, String> >();
        try {
            for (MultipartFile multipartFile : file) {
                  pacsService.uploadDicomFile(multipartFile, "Manh", "Male");
//                Map<String, String>  respon = pacsService.uploadDicomFile(multipartFile);
//                listRespone.add(respon);
            }
//            return ResponseEntity.ok(listRespone.toString());
            return ResponseEntity.ok("update dicom file successfully!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Upload failed: " + e.getMessage());
        }
    }
}
