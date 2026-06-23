package com.prepforge.prepforgeapi.controller;

import org.springframework.web.bind.annotation.RestController;
import com.prepforge.prepforgeapi.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import com.prepforge.prepforgeapi.model.User;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/register")
    public String register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/api/login")
    public String login(@RequestBody User user) {
        return userService.loginUser(user);
    }


}