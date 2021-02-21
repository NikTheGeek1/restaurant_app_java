package restaurantapp.server.websocket.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import restaurantapp.server.websocket.ActiveUserManager;
import restaurantapp.server.websocket.ChatMessage;
import restaurantapp.server.websocket.interfaces.ActiveUserChangeListener;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.HashMap;

@Controller
public class ChatController implements ActiveUserChangeListener {

    @Autowired
    private SimpMessagingTemplate webSocket;

    @Autowired
    private ActiveUserManager activeUserManager;

    @PostConstruct
    private void init() {
        activeUserManager.registerListener(this);
    }

    @PreDestroy
    private void destroy() {
        activeUserManager.removeListener(this);
    }

    @GetMapping("/sockjs-message")
    public String getWebSocketWithSockJs() {
        return "sockjs-message";
    }

    @MessageMapping("/chat")
    public void send(SimpMessageHeaderAccessor sha, @Payload ChatMessage chatMessage) throws Exception {
        String sender = sha.getUser().getName();
        ChatMessage message = new ChatMessage(chatMessage.getFromUserName(), chatMessage.getFromUserType(), chatMessage.getText(), chatMessage.getRecipient(), chatMessage.getRecipientType());
        webSocket.convertAndSendToUser(chatMessage.getRecipient(), "/queue/messages", message);
    }

    @MessageMapping("/broadcast")
    public void userLogin(@Payload ChatMessage chatMessage) throws Exception {
        ChatMessage message = new ChatMessage(chatMessage.getFromUserName(), chatMessage.getFromUserType(), chatMessage.getText(), "all", "all");
        webSocket.convertAndSend( "/topic/broadcast", message);
    }

    @Override
    public void notifyActiveUserChange() {
        HashMap<String, HashMap<String, String>> activeUsers = activeUserManager.getAll();
        webSocket.convertAndSend("/topic/active", activeUsers);
    }



}
