package com.prepforge.prepforgeapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.prepforge.prepforgeapi.model.DsaProblem;

public interface DsaProblemRepository extends MongoRepository<DsaProblem, String> {

}