package com.ifi.chat.stomp.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {
    @MessageMapping("/chat/sendMessage")
    @SendTo("/public/chat")
    public String sendMessage(@Payload String message) {
        return message;
    }

    @MessageMapping("/chat/u={username}")
    @SendTo("/public/chat/{username}")
    public String sendMessageToUser(@Payload String message, @DestinationVariable String username){
        return message;
    }
}
