package com.demo.insurance.service;

import com.demo.insurance.model.Proposal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QualityCheckService {

    @Autowired
    private ProposalService proposalService;

    public Proposal approveQualityCheck(String proposalId) {
        Proposal proposal = proposalService.getProposal(proposalId);
        if (!"PAYMENT_COMPLETED".equals(proposal.getStatus())) {
            throw new RuntimeException("Proposal must have completed payment before QC");
        }
        proposal.setStatus("QUALITY_PASSED");
        return proposalService.updateProposal(proposal);
    }
}