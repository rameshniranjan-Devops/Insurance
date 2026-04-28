package com.demo.insurance.controller;

import com.demo.insurance.model.Proposal;
import com.demo.insurance.service.QualityCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/qualitycheck")
public class QualityCheckController {

    @Autowired
    private QualityCheckService qualityCheckService;

    @PostMapping("/{proposalId}")
    public Proposal approveQC(@PathVariable String proposalId) {
        return qualityCheckService.approveQualityCheck(proposalId);
    }
}