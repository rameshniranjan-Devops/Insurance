package com.demo.insurance.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private String proposalId;
    private double amount;
}