package com.project.petcare.controller;

import com.project.petcare.model.Comment;
import com.project.petcare.model.Message;
import com.project.petcare.model.User;
import com.project.petcare.repository.MessageRepository;
import com.project.petcare.request_dto.MessageDto;
import com.project.petcare.response_dto.ResMessageDto;
import com.project.petcare.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class MessageController {

    MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/user/{other_id}")
    public List<ResMessageDto> getUserMessagesFrom(@PathVariable Long other_id){
        return messageService.messageToDtoList(other_id);
    }

    @PostMapping("/user/{other_id}")
    public ResponseEntity<Message> postMessageTo(@RequestBody MessageDto messageDto ,@PathVariable Long other_id) {
        messageService.SaveToDto(messageDto,other_id);
        return ResponseEntity.ok().build();
    }

}
