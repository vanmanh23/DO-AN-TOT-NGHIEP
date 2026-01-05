package com.manh.healthcare.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "report_results")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportResults {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "conclusion", columnDefinition = "TEXT")
    private String conclusion;

    @Column(name = "suggestion", columnDefinition = "TEXT")
    private String suggestion;

    @OneToOne
    @JoinColumn(name = "order_id", referencedColumnName = "order_id")
    private Orders order;

    @Lob
    @Column(name = "pdf_report", columnDefinition = "LONGBLOB")
    private byte[] pdf_report;
}
