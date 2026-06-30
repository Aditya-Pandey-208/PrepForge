package com.prepforge.prepforgeapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.prepforge.prepforgeapi.model.SubjectProblem;

public interface SubjectProblemRepository extends MongoRepository<SubjectProblem, String> {

}