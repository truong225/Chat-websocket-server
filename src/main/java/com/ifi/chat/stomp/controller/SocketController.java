package com.ifi.chat.stomp.controller;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ifi.chat.entity.User;
import com.ifi.chat.service.UserService;
import jdk.nashorn.internal.ir.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.io.IOException;

@Controller
public class SocketController {
    @Autowired
    private UserService userService;

    @MessageMapping("/chat/login")
    @SendTo("/public/login")
    public String login(@Payload String message) throws IOException {
        JsonNode node = new ObjectMapper().readTree(message);
        String username = node.get("username").textValue();
        String password = node.get("password").textValue();
        User user = userService.getUser(username, password);
        if (user == null)
            return "{'type':'error','content':'Wrong username or password'";
        else {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(user);
        }
    }
}
