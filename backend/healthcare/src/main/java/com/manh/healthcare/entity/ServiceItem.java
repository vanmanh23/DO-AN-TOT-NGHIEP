package com.manh.healthcare.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "serviceItems")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(name = "service_code", nullable = false)
    private String serviceCode;
    @Column(name = "service_name", nullable = false)
    private String serviceName;
//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "modality_id", referencedColumnName = "id")
//    private Modalities modalities;
    @Column(name = "unit_price", nullable = false)
    private double unitPrice;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "modality_id", nullable = false)
    private Modalities modality;
}
