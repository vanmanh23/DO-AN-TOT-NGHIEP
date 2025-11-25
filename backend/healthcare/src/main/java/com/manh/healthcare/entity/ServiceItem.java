package com.manh.healthcare.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

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
    @Column(name = "unit_price", nullable = false)
    private double unitPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "modality_id", nullable = false)
    @JsonBackReference  // ← Thêm này (phía child) - Sẽ KHÔNG serialize modality
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Modalities modality;

//    @ManyToOne(fetch = FetchType.LAZY)
    @ManyToMany(mappedBy = "serviceItems")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonBackReference
    private Set<Orders> orders;
//    @JsonBackReference  // ← Thêm này (phía child) - Sẽ KHÔNG serialize order
//    @JoinColumn(name = "order_id", nullable = true)
//    private Orders order;
}
