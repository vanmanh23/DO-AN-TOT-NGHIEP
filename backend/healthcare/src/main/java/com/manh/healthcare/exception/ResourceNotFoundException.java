package com.manh.healthcare.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String userNotFound) {
        super(userNotFound);
    }
}
