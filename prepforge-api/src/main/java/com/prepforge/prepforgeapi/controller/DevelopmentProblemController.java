package com.prepforge.prepforgeapi.controller;

import org.springframework.web.bind.annotation.RestController;
import com.prepforge.prepforgeapi.service.DevelopmentProblemService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import com.prepforge.prepforgeapi.model.DevelopmentProblem;

@RestController
public class DevelopmentProblemController {
    private final DevelopmentProblemService problemService;

    public DevelopmentProblemController(DevelopmentProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping("/api/development/problems")
    public List<DevelopmentProblem> getAllProblems() {
        return problemService.getAllProblems();
    }
    
}