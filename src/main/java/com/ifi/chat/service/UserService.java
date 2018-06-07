package com.ifi.chat.service;


import com.ifi.chat.entity.User;

public interface UserService {
    User getUser(String username, String password);

    User addUser(String username, String password);

    User getUserByName(String username);
}
