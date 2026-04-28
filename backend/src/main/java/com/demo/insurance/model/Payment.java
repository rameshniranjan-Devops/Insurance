package com.demo.insurance.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "payments")
public class Payment {
    @Id
    private String id;
    private String proposalId;
    private double amount;
    private String receiptNumber;
    private LocalDateTime paymentDate;
}