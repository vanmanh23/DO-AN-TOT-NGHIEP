package com.manh.healthcare.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseResponse {
    private boolean isSuccess;
    private String message;
    private Object result;
    private Object errors;

    public static BaseResponse createSuccessResponse(String successMessage, Object responseData) {
        return new BaseResponse(true, successMessage, responseData, null);
    }

    public static BaseResponse createSuccessResponse(String successMessage) {
        return new BaseResponse(true, successMessage, null, null);
    }

    public static BaseResponse createErrorResponse(String errorMessage, Object responseData) {
        return new BaseResponse(false, errorMessage, null, responseData);
    }

    public static BaseResponse createErrorResponse(String errorMessage) {
        return new BaseResponse(false, errorMessage, null, null);
    }
}
