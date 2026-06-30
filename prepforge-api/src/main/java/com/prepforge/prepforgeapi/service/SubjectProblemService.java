package com.prepforge.prepforgeapi.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.prepforge.prepforgeapi.model.SubjectProblem;
import com.prepforge.prepforgeapi.repository.SubjectProblemRepository;

@Service
public class SubjectProblemService {

    private final SubjectProblemRepository SubjectProblemRepository;

    public SubjectProblemService(SubjectProblemRepository SubjectProblemRepository) {
        this.SubjectProblemRepository = SubjectProblemRepository;
    }

    public List<SubjectProblem> getAllProblems() {
        return SubjectProblemRepository.findAll();
    }

    public SubjectProblem saveProblem(SubjectProblem problem) {
        return SubjectProblemRepository.save(problem);
    }
}