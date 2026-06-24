package com.prepforge.prepforgeapi.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.prepforge.prepforgeapi.model.DsaProgress;
import com.prepforge.prepforgeapi.service.DsaProgressService;

@RestController
public class DsaProgressController {

    private final DsaProgressService dsaProgressService;

    public DsaProgressController(DsaProgressService dsaProgressService) {
        this.dsaProgressService = dsaProgressService;
    }

    @PostMapping("/api/dsa/progress")
    public String toggleProgress(@RequestBody DsaProgress progress) {
        return dsaProgressService.toggleProgress(progress.getUserEmail(), progress.getProblemId());
    }

    @GetMapping("/api/dsa/progress")
    public List<DsaProgress> getSolvedProblems(@RequestParam String userEmail) {
        return dsaProgressService.getSolvedProblems(userEmail);
    }
}