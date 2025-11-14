package com.manh.healthcare.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceItemRequestDTO {
    @NotBlank(message = "Service code is required")
    private String serviceCode;

    @NotBlank(message = "Service name is required")
    private String serviceName;

    @NotNull(message = "Modality ID is required")
    private String modalityId;

    @NotNull(message = "Unit price is required")
    @Min(value = 0, message = "Unit price must be greater than or equal to 0")
    private Double unitPrice;
}
