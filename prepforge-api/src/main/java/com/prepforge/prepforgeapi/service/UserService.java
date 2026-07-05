package com.prepforge.prepforgeapi.service;

import org.springframework.stereotype.Service;

import com.prepforge.prepforgeapi.dto.LoginResponse;
import com.prepforge.prepforgeapi.dto.MessageResponse;
import com.prepforge.prepforgeapi.exception.ResourceException;
import com.prepforge.prepforgeapi.model.User;
import com.prepforge.prepforgeapi.repository.UserRepository;
import com.prepforge.prepforgeapi.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;


@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public MessageResponse registerUser(User user) {

        User existingEmail = userRepository.findByEmail(user.getEmail());

        if (existingEmail != null) {
            throw new ResourceException("Email already registered");
        }
        
        User existingUsername = userRepository.findByUsername(user.getUsername());

        if (existingUsername != null) {
            throw new ResourceException("Username already taken");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return new MessageResponse("Welcome " + user.getUsername());
    }

    public LoginResponse loginUser(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        
        if (existingUser != null &&
                passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            String token = jwtUtil.generateToken(existingUser.getUsername());
            return new LoginResponse(existingUser.getUsername(), token);
        }

        throw new ResourceException("Invalid email or password");
    }
}
