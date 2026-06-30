package com.prepforge.prepforgeapi.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.prepforge.prepforgeapi.model.DevelopmentProgress;
import com.prepforge.prepforgeapi.repository.DevelopmentProgressRepository;

@Service
public class DevelopmentProgressService {

    private final DevelopmentProgressRepository developmentProgressRepository;

    public DevelopmentProgressService(DevelopmentProgressRepository developmentProgressRepository) {
        this.developmentProgressRepository = developmentProgressRepository;
    }

    public String toggleProgress(String username, String problemId) {
        DevelopmentProgress existing = developmentProgressRepository.findByUsernameAndProblemId(username, problemId);

        if(existing == null) {
            DevelopmentProgress progress = new DevelopmentProgress(username, problemId);
            developmentProgressRepository.save(progress);
            return "Solved";
        }

        developmentProgressRepository.delete(existing);
        return "Unsolved";
    }

    public List<DevelopmentProgress> getSolvedProblems(String username) {
        return developmentProgressRepository.findByUsername(username);
    }

}