package com.manh.healthcare.dtos;

import com.manh.healthcare.entity.EModality;
import com.manh.healthcare.entity.EStatusModality;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModalitiesDTO {
    private String id;
    private EModality type;
    private String manufacturer;
    private String model;
    private EStatusModality status;
    private String departmentId;
    private DepartmentDTO department;
    private Set<ServiceItemResponseDTO> serviceItems;
}
