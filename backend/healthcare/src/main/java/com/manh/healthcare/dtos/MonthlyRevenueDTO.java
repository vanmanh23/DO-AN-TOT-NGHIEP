package com.manh.healthcare.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MonthlyRevenueDTO {
    private Integer year;
    private Integer month;
    private Double totalRevenue;
}
