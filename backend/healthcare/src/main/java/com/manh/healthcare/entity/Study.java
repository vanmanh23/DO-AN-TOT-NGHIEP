package com.manh.healthcare.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "studies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Study {
    @Id
    private String ID;
    @Column(name = "studyInstance_uid", nullable = false)
    private String studyInstanceUID;
    @Column(name = "seriesInstance_uid", nullable = false)
    private String seriesInstanceUID;
    @Column(name = "modality", nullable = false)
    private EModality modality;
    @Transient
    private Integer age;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

}
