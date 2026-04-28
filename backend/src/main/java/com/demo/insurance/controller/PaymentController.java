package com.demo.insurance.controller;

import com.demo.insurance.dto.PaymentRequest;
import com.demo.insurance.model.Payment;
import com.demo.insurance.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/pay")
    public Payment makePayment(@RequestBody PaymentRequest request) {
        return paymentService.processPayment(request.getProposalId(), request.getAmount());
    }

    @GetMapping("/receipt/{proposalId}")
    public Payment getReceipt(@PathVariable String proposalId) {
        return paymentService.getReceipt(proposalId);
    }
}