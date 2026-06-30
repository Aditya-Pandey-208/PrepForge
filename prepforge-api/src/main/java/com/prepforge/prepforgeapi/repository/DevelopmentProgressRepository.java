package com.prepforge.prepforgeapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import com.prepforge.prepforgeapi.model.DevelopmentProgress;

public interface DevelopmentProgressRepository extends MongoRepository<DevelopmentProgress, String> {
    DevelopmentProgress findByUsernameAndProblemId(
        String username,
        String problemId
    );

    List<DevelopmentProgress> findByUsername(String username);
}

