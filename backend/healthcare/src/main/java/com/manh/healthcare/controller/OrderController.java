package com.manh.healthcare.controller;

import com.manh.healthcare.dtos.*;
import com.manh.healthcare.entity.EOrderStatus;
import com.manh.healthcare.service.MailService;
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

import java.time.LocalDate;
import java.util.List;

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

    @GetMapping("/status/{status}")
    public ResponseEntity<BaseResponse> getByStatus(@PathVariable EOrderStatus status) {
        List<OrderDTO> orders = orderService.findByStatus(status);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("order.success.findByStatus", orders);
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
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> findById(@PathVariable String id) {
        OrderDTO order = orderService.findById(id);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("order.success.findById", order);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }
    @PutMapping("/change-status")
    public ResponseEntity<BaseResponse> changeStatus(@RequestBody ChangeStatusRequestDTO req) {
        orderService.changeStatus(req.getNew_status(), req.getOrder_id());
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("order_success_changestatus");
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }

    @GetMapping("/patients-by-day")
    public ResponseEntity<BaseResponse> getPatientsByDay(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate
    ) {
        List<DailyPatientCountDTO> dailyPatientCountDTOList = orderService.getPatientCountLast7Days(startDate, endDate);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("order_success_getPatientCountLast7Days", dailyPatientCountDTOList);
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }
}
