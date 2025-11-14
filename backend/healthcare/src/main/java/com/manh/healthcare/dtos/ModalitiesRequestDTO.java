package com.manh.healthcare.dtos;

import com.manh.healthcare.entity.EModality;
import com.manh.healthcare.entity.EStatusModality;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ModalitiesRequestDTO {
    @NotNull(message = "Type is required")
    private EModality type;

    @NotBlank(message = "Manufacturer is required")
    private String manufacturer;

    @NotBlank(message = "Model is required")
    private String model;

    @NotNull(message = "Status is required")
    private EStatusModality status;

    @NotBlank(message = "Department ID is required")
    private String departmentId;
}
