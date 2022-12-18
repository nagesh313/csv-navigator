package com.controllers.admin;

import com.models.ERole;
import com.models.Role;
import com.models.User;
import com.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.*;

@RestController
@RequestMapping("/api/v1/admin")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @GetMapping("/getAllUsers")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> allAccess() {
        return userRepository.findAll();
    }

    @GetMapping("/user/enable/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public void enable(@PathVariable String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            User userObj = user.get();
            if (userObj.getFirstname().equals("Admin")) {
                throw new UnsupportedOperationException("User not Allowed to be changed");
            }
            userObj.setEnabled(true);
            userRepository.save(userObj);
        }
    }

    @GetMapping("/user/disable/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public void disable(@PathVariable String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            User userObj = user.get();
            if (userObj.getFirstname().equals("Admin")) {
                throw new UnsupportedOperationException("User not Allowed to be changed");
            }
            userObj.setEnabled(false);
            userRepository.save(userObj);
        }
    }
//    @GetMapping("/user")
//    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
//    public String userAccess() {
//        return "User Content.";
//    }
//
//    @GetMapping("/mod")
//    @PreAuthorize("hasRole('MODERATOR')")
//    public String moderatorAccess() {
//        return "Moderator Board.";
//    }
//
//    @GetMapping("/admin")
//    @PreAuthorize("hasRole('ADMIN')")
//    public String adminAccess() {
//        return "Admin Board.";
//    }
}
