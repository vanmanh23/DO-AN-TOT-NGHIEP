package com.manh.healthcare.dtos;

import jakarta.annotation.Nullable;
import lombok.Data;

@Data
public class StudyDTO {
    @Nullable
    private String id;
    private String studyInstanceUID;
    private String seriesInstanceUID;
    private String instanceUID;
    private String orderId;
}
