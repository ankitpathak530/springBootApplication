package com.learnng.websocket.Controller;

import com.learnng.websocket.Modals.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

    @MessageMapping("/message")
    @SendTo("/topic/return-to")
    private Message getContent(@RequestBody Message message){
//        try{
////            Thread.sleep(1000);
//        }
//        catch(InterruptedException e){
//            e.printStackTrace();
//        }
        return message;
    }

}
