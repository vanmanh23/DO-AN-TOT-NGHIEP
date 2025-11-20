package com.manh.healthcare.service;

import com.manh.healthcare.dtos.DoctorRequestDTO;
import com.manh.healthcare.dtos.DoctorResponseDTO;
import com.manh.healthcare.entity.Doctor;
import com.manh.healthcare.entity.Person;
import com.manh.healthcare.repository.DoctorRepository;
import com.manh.healthcare.repository.PersonRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private PersonRepository personRepository;

    public List<DoctorResponseDTO> findAll() {
        List<Doctor> allDoctor = doctorRepository.findAll();
        return allDoctor.stream().map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public DoctorResponseDTO createDoctor(DoctorRequestDTO request) {
        Person person = new Person();
        person.setFullName(request.getFullName());
        person.setDateOfBirth(request.getDateOfBirth());
        person.setGender(request.getGender());
        person.setPhoneNumber(request.getPhoneNumber());
        person.setEmail(request.getEmail());
        person.setAddress(request.getAddress());
        person.setCreatedAt(LocalDateTime.now());
        person.setUpdatedAt(LocalDateTime.now());
        Person savedPerson = personRepository.save(person);

        Doctor doctor = new Doctor();
        doctor.setPerson(savedPerson);
        doctor.setDoctorCode(generateFormCode());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setDegree(request.getDegree());
        doctor.setYearsOfExperience(request.getYearsOfExperience());
        doctor.setClinicRoom(request.getClinicRoom());
        doctor.setStatus(request.getStatus());

        Doctor savedDoctor = doctorRepository.save(doctor);
        return convertToDTO(savedDoctor);
    }

    private DoctorResponseDTO convertToDTO(Doctor doctor) {
        DoctorResponseDTO dto = new DoctorResponseDTO();
        dto.setId(doctor.getId());
        dto.setFullName(doctor.getPerson().getFullName());
        dto.setDateOfBirth(doctor.getPerson().getDateOfBirth());
        dto.setGender(doctor.getPerson().getGender());
        dto.setPhoneNumber(doctor.getPerson().getPhoneNumber());
        dto.setEmail(doctor.getPerson().getEmail());
        dto.setAddress(doctor.getPerson().getAddress());
        dto.setDoctorCode(doctor.getDoctorCode());
        dto.setSpecialization(doctor.getSpecialization());
        dto.setDegree(doctor.getDegree());
        dto.setYearsOfExperience(doctor.getYearsOfExperience());
        dto.setClinicRoom(doctor.getClinicRoom());
        dto.setStatus(doctor.getStatus());
        return dto;
    }

    public DoctorResponseDTO updateDoctor(String id, DoctorRequestDTO request) {
        Doctor existingDoctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        Person existingPerson = existingDoctor.getPerson();

        // Update Person fields
        existingPerson.setFullName(request.getFullName());
        existingPerson.setDateOfBirth(request.getDateOfBirth());
        existingPerson.setGender(request.getGender());
        existingPerson.setPhoneNumber(request.getPhoneNumber());
        existingPerson.setEmail(request.getEmail());
        existingPerson.setAddress(request.getAddress());
        existingPerson.setUpdatedAt(LocalDateTime.now());
        personRepository.save(existingPerson);

        // Update Doctor fields
        existingDoctor.setSpecialization(request.getSpecialization());
        existingDoctor.setDegree(request.getDegree());
        existingDoctor.setYearsOfExperience(request.getYearsOfExperience());
        existingDoctor.setClinicRoom(request.getClinicRoom());
        existingDoctor.setStatus(request.getStatus());

        Doctor updatedDoctor = doctorRepository.save(existingDoctor);
        return convertToDTO(updatedDoctor);
    }

    public DoctorResponseDTO inActiveDoctor(String id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        doctor.setStatus("INACTIVE");
        Doctor updatedDoctor = doctorRepository.save(doctor);
        return convertToDTO(updatedDoctor);
    }

    public void removeDoctor(String id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        doctorRepository.deleteById(id);
    }

    @Transactional
    public String generateFormCode() {
        String prefix = "DOC" + "-";
        // Find the highest sequence number for today
        int sequenceNumber = getNextSequenceNumber(prefix);
        // Format: DOC + YYYYMMDD + 3-digit sequence
        return String.format("%s%04d", prefix, sequenceNumber);
    }
    @Transactional
    private int getNextSequenceNumber(String prefix) {
        // Get all form codes that start with the prefix
        String lastFormCode = doctorRepository.findAll().stream()
                .map(form -> form.getDoctorCode())
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
}