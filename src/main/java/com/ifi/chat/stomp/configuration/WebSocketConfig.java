package com.ifi.chat.stomp.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
//@EnableWebSocketMessageBroker is used to enable our WebSocket server

/**
 * Implement WebSocketMessageBrokerConfigurer interface to configure html5Websocket connection
 */
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    /**
     * Register html5Websocket endpoint that client user to connect to html5Websocket server
     *
     * @param registry withSockJS() is used to enable fallback options for browser don't support html5Websocket
     *                 STOMP: Simple text oriented message protocol. It's protocol define format and rules for data exchange
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){
        registry.addEndpoint("/ws/").setAllowedOrigins("*").withSockJS();
    }

    /**
     * Configure a message broker used to route messages from a user to another
     *
     * @param registry
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Define the message whose destination start with "app" should be routed to message handling methods
        registry.setApplicationDestinationPrefixes("/app");

        // Define the messages whose destination start with "topic" should be routed to message broker
        // Message broker broadcast messages to all connected client subscribed to a particular topic
        registry.enableSimpleBroker("/public");

    }
}
