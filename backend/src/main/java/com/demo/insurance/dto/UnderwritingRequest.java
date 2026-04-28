package com.demo.insurance.dto;

import lombok.Data;

@Data
public class UnderwritingRequest {
    private double extraPremiumAmount;
    private String remarks;
}