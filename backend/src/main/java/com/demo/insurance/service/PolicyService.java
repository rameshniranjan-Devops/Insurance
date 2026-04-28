package com.demo.insurance.service;

import com.demo.insurance.model.Proposal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PolicyService {

    @Autowired
    private ProposalService proposalService;

    public Proposal issuePolicy(String proposalId) {
        Proposal proposal = proposalService.getProposal(proposalId);
        if (!"QUALITY_PASSED".equals(proposal.getStatus())) {
            throw new RuntimeException("Quality check must be passed before policy issue");
        }
        String policyNumber = "POL" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        proposal.setPolicyNumber(policyNumber);
        proposal.setStatus("POLICY_ISSUED");
        return proposalService.updateProposal(proposal);
    }
}