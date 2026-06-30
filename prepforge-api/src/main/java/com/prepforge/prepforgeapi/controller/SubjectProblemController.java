package com.prepforge.prepforgeapi.controller;

import org.springframework.web.bind.annotation.RestController;
import com.prepforge.prepforgeapi.service.SubjectProblemService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import com.prepforge.prepforgeapi.model.SubjectProblem;

@RestController
public class SubjectProblemController {
    private final SubjectProblemService problemService;

    public SubjectProblemController(SubjectProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping("/api/subject/problems")
    public List<SubjectProblem> getAllProblems() {
        return problemService.getAllProblems();
    }
    
}