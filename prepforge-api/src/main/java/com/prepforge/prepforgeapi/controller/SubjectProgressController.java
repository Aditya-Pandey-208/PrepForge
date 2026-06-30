package com.prepforge.prepforgeapi.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.security.core.Authentication;
import com.prepforge.prepforgeapi.model.SubjectProgress;
import com.prepforge.prepforgeapi.service.SubjectProgressService;

@RestController
public class SubjectProgressController {

    private final SubjectProgressService SubjectProgressService;

    public SubjectProgressController(SubjectProgressService SubjectProgressService) {
        this.SubjectProgressService = SubjectProgressService;
    }

    @PostMapping("/api/subject/progress")
    public String toggleProgress(@RequestBody SubjectProgress progress, Authentication authentication) {
        String username = authentication.getName();
        return SubjectProgressService.toggleProgress(username, progress.getProblemId());
    }

    @GetMapping("/api/subject/progress")
    public List<SubjectProgress> getSolvedProblems(Authentication authentication) {
        String username = authentication.getName();
        return SubjectProgressService.getSolvedProblems(username);
    }
}