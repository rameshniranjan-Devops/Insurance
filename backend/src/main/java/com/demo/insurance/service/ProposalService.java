package com.demo.insurance.service;

import com.demo.insurance.model.Proposal;
import com.demo.insurance.repository.ProposalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class ProposalService {

    @Autowired
    private ProposalRepository proposalRepository;

    public Proposal createProposal(Proposal proposal) {
        // Calculate base premium: simple formula (sumAssured * term / 1000) + (age * 10)
        double base = (proposal.getSumAssured() * proposal.getTerm() / 1000.0) + (proposal.getAge() * 10);
        proposal.setBasePremium(base);
        proposal.setExtraPremiumAmount(0);
        proposal.setTotalPremium(base);
        proposal.setStatus("PROPOSAL_CREATED");
        proposal.setCreatedAt(LocalDateTime.now());
        proposal.setUpdatedAt(LocalDateTime.now());
        return proposalRepository.save(proposal);
    }

    public Proposal getProposal(String id) {
        return proposalRepository.findById(id).orElseThrow(() -> new RuntimeException("Proposal not found"));
    }

    public java.util.List<Proposal> getProposalsByStatus(String status) {
        return proposalRepository.findByStatus(status);
    }

    public java.util.List<Proposal> getAllProposals() {
        return proposalRepository.findAll();
    }

    public Proposal updateProposal(Proposal proposal) {
        proposal.setUpdatedAt(LocalDateTime.now());
        return proposalRepository.save(proposal);
    }
}