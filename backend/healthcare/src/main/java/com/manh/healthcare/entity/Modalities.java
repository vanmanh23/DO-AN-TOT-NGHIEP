package com.manh.healthcare.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "modalities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Modalities {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Enumerated(EnumType.STRING)
    private EModality type;
    @Column(name = "manufacturer", nullable = false)
    private String manufacturer;
    @Column(name = "model", nullable = false)
    private String model;
    @Enumerated(EnumType.STRING)
    private EStatusModality status;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "department_id", referencedColumnName = "department_id")
    private Department department;
//    @OneToOne(mappedBy = "modalities")
//    private ServiceItem serviceItem;
    @OneToMany(mappedBy = "modality", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ServiceItem> serviceItems;
}
