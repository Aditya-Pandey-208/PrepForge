package com.prepforge.prepforgeapi.controller;

import org.springframework.web.bind.annotation.RestController;
import com.prepforge.prepforgeapi.service.DsaProblemService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import com.prepforge.prepforgeapi.model.DsaProblem;

@RestController
public class DsaProblemController {
    private final DsaProblemService problemService;

    public DsaProblemController(DsaProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping("/api/dsa/problems")
    public List<DsaProblem> getAllProblems() {
        return problemService.getAllProblems();
    }
    
}