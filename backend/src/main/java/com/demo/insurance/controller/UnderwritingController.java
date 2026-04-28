package com.demo.insurance.controller;

import com.demo.insurance.dto.UnderwritingRequest;
import com.demo.insurance.model.Proposal;
import com.demo.insurance.service.UnderwritingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/underwriting")
public class UnderwritingController {

    @Autowired
    private UnderwritingService underwritingService;

    @PostMapping("/{proposalId}")
    public Proposal addUnderwriting(@PathVariable String proposalId, @RequestBody UnderwritingRequest request) {
        return underwritingService.performUnderwriting(proposalId, request.getExtraPremiumAmount());
    }
}