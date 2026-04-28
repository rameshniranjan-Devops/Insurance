package com.demo.insurance.service;

import com.demo.insurance.model.Payment;
import com.demo.insurance.model.Proposal;
import com.demo.insurance.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ProposalService proposalService;

    public Payment processPayment(String proposalId, double amount) {
        Proposal proposal = proposalService.getProposal(proposalId);
        if (!"UNDERWRITING_COMPLETED".equals(proposal.getStatus())) {
            throw new RuntimeException("Proposal not ready for payment");
        }
        if (Math.abs(proposal.getTotalPremium() - amount) > 0.01) {
            throw new RuntimeException("Amount does not match total premium");
        }
        Payment payment = new Payment();
        payment.setProposalId(proposalId);
        payment.setAmount(amount);
        payment.setReceiptNumber("RCP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        payment.setPaymentDate(LocalDateTime.now());
        Payment saved = paymentRepository.save(payment);

        proposal.setStatus("PAYMENT_COMPLETED");
        proposalService.updateProposal(proposal);
        return saved;
    }

    public Payment getReceipt(String proposalId) {
        return paymentRepository.findByProposalId(proposalId)
                .orElseThrow(() -> new RuntimeException("No payment found for this proposal"));
    }
}