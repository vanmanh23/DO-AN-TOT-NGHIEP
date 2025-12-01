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
    @GeneratedValue(strategy = GenerationType.UUID)
    private String ID;

    @Column(name = "studyInstance_uid", nullable = false)
    private String studyInstanceUID;

    @Column(name = "seriesInstance_uid", nullable = false)
    private String seriesInstanceUID;

    @Column(name = "Instance_uid", nullable = false)
    private String InstanceUID;

    @OneToOne
    @JoinColumn(name = "order_id", referencedColumnName = "order_id")
    private Orders order;
}
