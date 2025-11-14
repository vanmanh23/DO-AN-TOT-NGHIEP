package com.manh.healthcare.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// DTO cho việc cập nhật trạng thái
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceptionFormUpdateStatusDTO {
    private String status;
    private String notes;
}
