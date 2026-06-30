package com.prepforge.prepforgeapi.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.prepforge.prepforgeapi.model.DevelopmentProblem;
import com.prepforge.prepforgeapi.repository.DevelopmentProblemRepository;

@Service
public class DevelopmentProblemService {

    private final DevelopmentProblemRepository DevelopmentProblemRepository;

    public DevelopmentProblemService(DevelopmentProblemRepository DevelopmentProblemRepository) {
        this.DevelopmentProblemRepository = DevelopmentProblemRepository;
    }

    public List<DevelopmentProblem> getAllProblems() {
        return DevelopmentProblemRepository.findAll();
    }

    public DevelopmentProblem saveProblem(DevelopmentProblem problem) {
        return DevelopmentProblemRepository.save(problem);
    }
}