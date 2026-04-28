package com.demo.insurance.controller;

import com.demo.insurance.model.Proposal;
import com.demo.insurance.service.ProposalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proposals")
public class ProposalController {

    @Autowired
    private ProposalService proposalService;

    @PostMapping
    public ResponseEntity<Proposal> createProposal(@RequestBody Proposal proposal) {
        return ResponseEntity.ok(proposalService.createProposal(proposal));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Proposal> getProposal(@PathVariable String id) {
        return ResponseEntity.ok(proposalService.getProposal(id));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Proposal>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(proposalService.getProposalsByStatus(status));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Proposal>> getAll() {
        return ResponseEntity.ok(proposalService.getAllProposals());
    }
}