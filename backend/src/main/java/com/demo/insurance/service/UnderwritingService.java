package com.demo.insurance.service;

import com.demo.insurance.model.Proposal;
import com.demo.insurance.repository.ProposalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UnderwritingService {

    @Autowired
    private ProposalService proposalService;

    public Proposal performUnderwriting(String proposalId, double extraPremiumAmount) {
        Proposal proposal = proposalService.getProposal(proposalId);
        if (!"PROPOSAL_CREATED".equals(proposal.getStatus())) {
            throw new RuntimeException("Proposal is not in CREATED state");
        }
        proposal.setExtraPremiumAmount(extraPremiumAmount);
        proposal.setTotalPremium(proposal.getBasePremium() + extraPremiumAmount);
        proposal.setStatus("UNDERWRITING_COMPLETED");
        return proposalService.updateProposal(proposal);
    }
}