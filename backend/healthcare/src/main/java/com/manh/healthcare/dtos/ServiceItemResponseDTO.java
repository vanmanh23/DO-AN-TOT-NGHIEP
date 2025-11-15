package com.manh.healthcare.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceItemResponseDTO {
    private String id;
    private String serviceCode;
    private String serviceName;
//    private ModalitiesDTO modality;
    private Double unitPrice;
}
