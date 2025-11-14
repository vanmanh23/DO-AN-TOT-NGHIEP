package com.manh.healthcare.service;

import com.manh.healthcare.repository.ReceptionFormRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class FormCodeGeneratorService {

    @Autowired
    private ReceptionFormRepository repository;

    /**
     * Generate form code with format: REC + YYYYMMDD + Sequential Number (3 digits)
     * Example: REC20241104001, REC20241104002
     */
    @Transactional
    public String generateFormCode() {
        LocalDate today = LocalDate.now();
        String dateStr = today.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String prefix = "REC" + dateStr;

        // Find the highest sequence number for today
        int sequenceNumber = getNextSequenceNumber(prefix);

        // Format: REC + YYYYMMDD + 3-digit sequence
        return String.format("%s%03d", prefix, sequenceNumber);
    }

    /**
     * Generate form code with custom prefix
     * Example: EXAM20241104001, CHECK20241104001
     */
    public String generateFormCodeWithPrefix(String customPrefix) {
        LocalDate today = LocalDate.now();
        String dateStr = today.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String prefix = customPrefix + dateStr;

        int sequenceNumber = getNextSequenceNumber(prefix);
        return String.format("%s%03d", prefix, sequenceNumber);
    }

    /**
     * Simple sequential format: REC-000001, REC-000002
     */
    public String generateSimpleSequentialCode() {
        long totalForms = repository.count();
        return String.format("REC-%06d", totalForms + 1);
    }

    /**
     * Get next sequence number for a given prefix
     */
    private int getNextSequenceNumber(String prefix) {
        // Get all form codes that start with the prefix
        String lastFormCode = repository.findAll().stream()
                .map(form -> form.getFormCode())
                .filter(code -> code != null && code.startsWith(prefix))
                .max(String::compareTo)
                .orElse(null);

        if (lastFormCode == null) {
            return 1;
        }

        // Extract the sequence number from the last code
        try {
            String sequenceStr = lastFormCode.substring(prefix.length());
            int lastSequence = Integer.parseInt(sequenceStr);
            return lastSequence + 1;
        } catch (Exception e) {
            return 1;
        }
    }

    /**
     * Generate UUID-based form code (unique but not sequential)
     */
    public String generateUUIDBasedCode() {
        return "REC-" + java.util.UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}