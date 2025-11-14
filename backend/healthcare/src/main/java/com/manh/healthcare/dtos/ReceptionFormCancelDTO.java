package com.manh.healthcare.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// DTO cho việc hủy phiếu
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceptionFormCancelDTO {
    private String cancellationReason;
}