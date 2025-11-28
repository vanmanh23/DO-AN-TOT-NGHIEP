package com.manh.healthcare.dtos;

import com.manh.healthcare.entity.EOrderStatus;
import lombok.Data;

@Data
public class ChangeStatusRequestDTO {
    private String order_id;
    private EOrderStatus new_status;
}
