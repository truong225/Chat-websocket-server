package com.ifi.chat.stomp.controller;

import com.ifi.chat.entity.User;
import com.ifi.chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/signin/u={username}/pass={password}")
    public User test(@PathVariable String username, @PathVariable String password) {
        User userLogin = userService.getUser(username, password);
        return userLogin;
    }
}