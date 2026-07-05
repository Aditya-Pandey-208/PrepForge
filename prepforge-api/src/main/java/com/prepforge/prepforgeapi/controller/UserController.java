package com.prepforge.prepforgeapi.controller;

import org.springframework.web.bind.annotation.RestController;
import com.prepforge.prepforgeapi.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import com.prepforge.prepforgeapi.model.User;
import org.springframework.web.bind.annotation.RequestBody;
import com.prepforge.prepforgeapi.dto.LoginResponse;
import com.prepforge.prepforgeapi.dto.MessageResponse;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/register")
    public MessageResponse register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/api/login")
    public LoginResponse loginUser(@RequestBody User user) {
        return userService.loginUser(user);
    }
}