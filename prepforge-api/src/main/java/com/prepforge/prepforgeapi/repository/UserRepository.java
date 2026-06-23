package com.prepforge.prepforgeapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.prepforge.prepforgeapi.model.User;

public interface UserRepository extends MongoRepository<User, String> {

    User findByEmail(String email);
}