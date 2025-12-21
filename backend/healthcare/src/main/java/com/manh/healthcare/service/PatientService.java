package com.manh.healthcare.service;

import com.manh.healthcare.dtos.PatientDTO;
import com.manh.healthcare.dtos.PatientRequestDTO;
import com.manh.healthcare.dtos.PatientResponseDTO;
import com.manh.healthcare.entity.Orders;
import com.manh.healthcare.entity.Patient;
import com.manh.healthcare.entity.Payment;
import com.manh.healthcare.repository.PatientRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<PatientResponseDTO> getAllPatients() {
        List<Patient> allPatients = patientRepository.findAll();
        List<PatientResponseDTO> patientResponseDTOS = allPatients.stream()
                .map(item -> modelMapper.map(item, PatientResponseDTO.class)).toList();
        return patientResponseDTOS;
    }

    public Patient patientAdmission(PatientRequestDTO patientRequestDTO) {

        Patient patient = new Patient();
        patient.setID(generateFormCode());
        patient.setName(patientRequestDTO.getName());
        patient.setAddress(patientRequestDTO.getAddress());
        patient.setGender(patientRequestDTO.getGender());
        patient.setBirthdate(patientRequestDTO.getBirthdate());
        patient.setPhoneNumber(patientRequestDTO.getPhoneNumber());
        patient.setIdentityCard(patientRequestDTO.getIdentityCard());
        patient.setGmail(patientRequestDTO.getGmail());
        return patientRepository.save(patient);
    }

    @Transactional
    public String generateFormCode() {
        LocalDate today = LocalDate.now();
        String dateStr = today.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String prefix = "REC" + dateStr + "-";

        // Find the highest sequence number for today
        int sequenceNumber = getNextSequenceNumber(prefix);

        // Format: REC + YYYYMMDD + 3-digit sequence
        return String.format("%s%03d", prefix, sequenceNumber);
    }

    @Transactional
    private int getNextSequenceNumber(String prefix) {
        // Get all form codes that start with the prefix
        String lastFormCode = patientRepository.findAll().stream()
                .map(form -> form.getID())
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

    public PatientDTO getPatientById(String id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("patient not found"));
        return convertDTO(patient);
    }

    /**
     * Cập nhật patient
     */
    @Transactional
    public Patient updatePatient(String id, PatientRequestDTO patientDetails) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));

        patient.setName(patientDetails.getName());
        patient.setBirthdate(patientDetails.getBirthdate());
        patient.setGender(patientDetails.getGender());
        patient.setAddress(patientDetails.getAddress());
        patient.setPhoneNumber(patientDetails.getPhoneNumber());
        patient.setIdentityCard(patientDetails.getIdentityCard());
        patient.setGmail(patientDetails.getGmail());

        return patientRepository.save(patient);
    }

    /**
     * Xóa patient
     */
    @Transactional
    public void deletePatient(String id) {
        if (!patientRepository.existsById(id)) {
            throw new RuntimeException("Patient not found with id: " + id);
        }
        patientRepository.deleteById(id);
    }

    /**
     * Kiểm tra patient có tồn tại không
     */
    public boolean existsById(String id) {
        return patientRepository.existsById(id);
    }

    /**
     * Đếm tổng số patients
     */
    public long countPatients() {
        return patientRepository.count();
    }

    /**
     * Tìm kiếm patient theo tên
     */
    public List<Patient> searchByName(String name) {
        List<Patient> patients = patientRepository.findByNameContainingIgnoreCase(name);
        return patients;
    }

    public Patient searchByPhoneNumber(String phonenumber) {
        Patient patient = patientRepository.findByPhoneNumber(phonenumber);
        return patient;
    }

    public PatientDTO convertDTO(Patient patient) {
        PatientDTO patientDTO = new PatientDTO();
        patientDTO.setId(patient.getID());
        patientDTO.setAge(patient.getAge());
        patientDTO.setName(patient.getName());
        patientDTO.setBirthdate(patient.getBirthdate());
        patientDTO.setGender(patient.getGender());
        patientDTO.setAddress(patient.getAddress());
        patientDTO.setPhoneNumber(patient.getPhoneNumber());
        patientDTO.setIdentityCard(patient.getIdentityCard());
        if(patient.getGmail() != null) {
            patientDTO.setGmail(patient.getGmail());
        }

        if (patient.getOrders() != null) {
            List<String> orderIds = new ArrayList<>();
            for (Orders order : patient.getOrders()) {
                orderIds.add(order.getOrderId());
            }
            patientDTO.setOrderIds(orderIds);
        }
        if (patient.getPayments() != null) {
            List<String> paymentIds = new ArrayList<>();
            for (Payment payment : patient.getPayments()) {
                paymentIds.add(payment.getId());
            }
            patientDTO.setPaymentIds(paymentIds);
        }
        return patientDTO;
    }
}
