package com.prepforge.prepforgeapi.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.prepforge.prepforgeapi.model.DsaProgress;
import com.prepforge.prepforgeapi.repository.DsaProgressRepository;

@Service
public class DsaProgressService {

    private final DsaProgressRepository dsaProgressRepository;

    public DsaProgressService(DsaProgressRepository dsaProgressRepository) {
        this.dsaProgressRepository = dsaProgressRepository;
    }

    public String toggleProgress(String userEmail, String problemId) {
        DsaProgress existing = dsaProgressRepository.findByUserEmailAndProblemId(userEmail, problemId);

        if(existing == null) {
            DsaProgress progress = new DsaProgress(userEmail, problemId);
            dsaProgressRepository.save(progress);
            return "Solved";
        }

        dsaProgressRepository.delete(existing);
        return "Unsolved";
    }

    public List<DsaProgress> getSolvedProblems(String userEmail) {
        return dsaProgressRepository.findByUserEmail(userEmail);
    }

}