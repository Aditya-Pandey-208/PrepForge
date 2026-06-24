package com.prepforge.prepforgeapi.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.prepforge.prepforgeapi.model.DsaProblem;
import com.prepforge.prepforgeapi.repository.DsaProblemRepository;

@Service
public class DsaProblemService {

    private final DsaProblemRepository DsaProblemRepository;

    public DsaProblemService(DsaProblemRepository DsaProblemRepository) {
        this.DsaProblemRepository = DsaProblemRepository;
    }

    public List<DsaProblem> getAllProblems() {
        return DsaProblemRepository.findAll();
    }

    public DsaProblem saveProblem(DsaProblem problem) {
        return DsaProblemRepository.save(problem);
    }
}