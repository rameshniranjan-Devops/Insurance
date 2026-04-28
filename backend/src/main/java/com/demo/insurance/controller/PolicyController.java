package com.demo.insurance.controller;

import com.demo.insurance.model.Proposal;
import com.demo.insurance.service.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/policy")
public class PolicyController {

    @Autowired
    private PolicyService policyService;

    @PostMapping("/issue/{proposalId}")
    public Proposal issuePolicy(@PathVariable String proposalId) {
        return policyService.issuePolicy(proposalId);
    }
}