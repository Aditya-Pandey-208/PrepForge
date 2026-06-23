package com.prepforge.prepforgeapi.service;

import org.springframework.stereotype.Service;
import com.prepforge.prepforgeapi.model.User;
import com.prepforge.prepforgeapi.repository.UserRepository;


@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String registerUser(User user) {

        User existingUser = userRepository.findByEmail(user.getEmail());

        if(existingUser != null) {
            return "Email already registered";
        }

        userRepository.save(user);

        return "Welcome " + user.getUsername();
    }

    public String loginUser(User user) {

        System.out.println("Login Email: " + user.getEmail());
        System.out.println("Login Password: " + user.getPassword());

        User existingUser = userRepository.findByEmail(user.getEmail());

        if(existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return existingUser.getUsername();
        }

        return "Invalid Credentials";
    }
}
