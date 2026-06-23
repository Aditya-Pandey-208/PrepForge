package com.prepforge.prepforgeapi.service;

import org.springframework.stereotype.Service;
import com.prepforge.prepforgeapi.model.User;

@Service
public class UserService {
    public String registerUser(User user) {

        System.out.println("Name: " + user.getUsername());
        System.out.println("Email: " + user.getEmail());
        System.out.println("Password: " + user.getPassword());

        return "Welcome " + user.getUsername();
    }

    public String loginUser(User user) {

        System.out.println("Login Email: " + user.getEmail());
        System.out.println("Login Password: " + user.getPassword());

        if(user.getEmail().equals("admin@gmail.com") 
              && user.getPassword().equals("9454")) {
            return "Aditya";
        }

        return "Invalid Credentials";
    }
}
