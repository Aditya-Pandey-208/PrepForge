package com.prepforge.prepforgeapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import com.prepforge.prepforgeapi.model.DsaProgress;

public interface DsaProgressRepository extends MongoRepository<DsaProgress, String> {
    DsaProgress findByUsernameAndProblemId(
        String username,
        String problemId
    );

    List<DsaProgress> findByUsername(String username);
}

