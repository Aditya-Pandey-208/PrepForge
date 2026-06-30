package com.prepforge.prepforgeapi.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.prepforge.prepforgeapi.model.SubjectProgress;
import com.prepforge.prepforgeapi.repository.SubjectProgressRepository;

@Service
public class SubjectProgressService {

    private final SubjectProgressRepository SubjectProgressRepository;

    public SubjectProgressService(SubjectProgressRepository SubjectProgressRepository) {
        this.SubjectProgressRepository = SubjectProgressRepository;
    }

    public String toggleProgress(String username, String problemId) {
        SubjectProgress existing = SubjectProgressRepository.findByUsernameAndProblemId(username, problemId);

        if(existing == null) {
            SubjectProgress progress = new SubjectProgress(username, problemId);
            SubjectProgressRepository.save(progress);
            return "Solved";
        }

        SubjectProgressRepository.delete(existing);
        return "Unsolved";
    }

    public List<SubjectProgress> getSolvedProblems(String username) {
        return SubjectProgressRepository.findByUsername(username);
    }

}