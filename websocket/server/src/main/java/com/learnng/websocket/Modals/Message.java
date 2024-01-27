package com.learnng.websocket.Modals;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Message {
    private String name;
    private String content;
}
