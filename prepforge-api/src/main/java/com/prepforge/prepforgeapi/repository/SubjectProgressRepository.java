package com.prepforge.prepforgeapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import com.prepforge.prepforgeapi.model.SubjectProgress;

public interface SubjectProgressRepository extends MongoRepository<SubjectProgress, String> {
    SubjectProgress findByUsernameAndProblemId(
        String username,
        String problemId
    );

    List<SubjectProgress> findByUsername(String username);
}

