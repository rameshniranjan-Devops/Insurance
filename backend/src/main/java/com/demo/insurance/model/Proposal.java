package com.demo.insurance.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "proposals")
public class Proposal {
    @Id
    private String id;
    private String customerName;
    private int age;
    private double sumAssured;
    private int term;
    private String occupation;
    private String healthStatus;
    private String habit;
    private String productName;
    private double basePremium;
    private double extraPremiumAmount;
    private double totalPremium;
    private String status;          // PROPOSAL_CREATED, UNDERWRITING_COMPLETED, PAYMENT_COMPLETED, QUALITY_PASSED, POLICY_ISSUED
    private String policyNumber;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}