package com.manh.healthcare.controller;

import com.manh.healthcare.dtos.BaseResponse;
import com.manh.healthcare.dtos.OrderCreateRequest;
import com.manh.healthcare.dtos.OrderDTO;
import com.manh.healthcare.dtos.OrdersRequestDTO;
import com.manh.healthcare.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<BaseResponse> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("ASC")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<OrderDTO> orders = orderService.getAllOrders(pageable);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("order.success.findALl", orders);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }
    @PostMapping
    public ResponseEntity<BaseResponse> createOrder(@Valid @RequestBody OrderCreateRequest request) {
        OrderDTO createdOrder = orderService.createOrder(request);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("order.success.create", createdOrder);
        return ResponseEntity.status(HttpStatus.CREATED).body(baseResponse);
    }
    @PutMapping("/{orderId}")
    public ResponseEntity<BaseResponse> updateOrder(
            @PathVariable String orderId,
            @Valid @RequestBody OrdersRequestDTO request) {

        OrderDTO updatedOrder = orderService.updateOrder(orderId, request);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("order.success.update", updatedOrder);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }
    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String orderId) {
        orderService.deleteOrder(orderId);
        return ResponseEntity.noContent().build();
    }
}
