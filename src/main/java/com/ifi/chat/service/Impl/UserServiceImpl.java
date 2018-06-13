package com.ifi.chat.service.Impl;

import com.ifi.chat.entity.User;
import com.ifi.chat.repository.UserRepository;
import com.ifi.chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUser(String username, String password) {
        return userRepository.getUser(username, password);
    }

    @Override
    public User addUser(String username, String password) {
        return userRepository.save(new User(username, password));
    }

    @Override
    public User getUserByName(String username) {
        return userRepository.getUserByName(username);
    }
}
