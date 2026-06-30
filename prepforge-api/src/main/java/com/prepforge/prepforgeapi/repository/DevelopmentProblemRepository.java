package com.prepforge.prepforgeapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.prepforge.prepforgeapi.model.DevelopmentProblem;

public interface DevelopmentProblemRepository extends MongoRepository<DevelopmentProblem, String> {

}