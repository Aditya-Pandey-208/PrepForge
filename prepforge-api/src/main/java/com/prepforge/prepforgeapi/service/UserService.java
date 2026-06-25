package com.prepforge.prepforgeapi.service;

import org.springframework.stereotype.Service;

import com.prepforge.prepforgeapi.dto.LoginResponse;
import com.prepforge.prepforgeapi.model.User;
import com.prepforge.prepforgeapi.repository.UserRepository;
import com.prepforge.prepforgeapi.security.JwtUtil;


@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public String registerUser(User user) {

        User existingEmail = userRepository.findByEmail(user.getEmail());

        if (existingEmail != null) {
            return "Email already registered";
        }
        
        User existingUsername = userRepository.findByUsername(user.getUsername());

        if (existingUsername != null) {
            return "Username already taken";
        }

        userRepository.save(user);

        return "Welcome " + user.getUsername();
    }

    public LoginResponse loginUser(User user) {
        System.out.println("Login Email: " + user.getEmail());
        System.out.println("Login Password: " + user.getPassword());
        
        User existingUser = userRepository.findByEmail(user.getEmail());
        
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            String token = jwtUtil.generateToken(existingUser.getUsername());
            return new LoginResponse(existingUser.getUsername(), token);
        }

        return null;
    }
}
