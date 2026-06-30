package com.prepforge.prepforgeapi.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.security.core.Authentication;
import com.prepforge.prepforgeapi.model.DevelopmentProgress;
import com.prepforge.prepforgeapi.service.DevelopmentProgressService;

@RestController
public class DevelopmentProgressController {

    private final DevelopmentProgressService DevelopmentProgressService;

    public DevelopmentProgressController(DevelopmentProgressService DevelopmentProgressService) {
        this.DevelopmentProgressService = DevelopmentProgressService;
    }

    @PostMapping("/api/development/progress")
    public String toggleProgress(@RequestBody DevelopmentProgress progress, Authentication authentication) {
        String username = authentication.getName();
        return DevelopmentProgressService.toggleProgress(username, progress.getProblemId());
    }

    @GetMapping("/api/development/progress")
    public List<DevelopmentProgress> getSolvedProblems(Authentication authentication) {
        String username = authentication.getName();
        return DevelopmentProgressService.getSolvedProblems(username);
    }
}