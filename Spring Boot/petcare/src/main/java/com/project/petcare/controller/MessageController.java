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
@CrossOrigin(origins = "http://localhost:4200")
public class MessageController {

    MessageService messageService;
    MessageRepository messageRepository;

    public MessageController(MessageService messageService, MessageRepository messageRepository) {
        this.messageService = messageService;
        this.messageRepository = messageRepository;
    }

    @GetMapping("/{other_id}")
    public List<ResMessageDto> getUserMessagesFrom(@PathVariable Long other_id){
        return messageService.messageToDtoList(other_id);
    }

    @PostMapping("/{other_id}")
    public ResponseEntity<Message> postMessageTo(@RequestBody MessageDto messageDto ,@PathVariable Long other_id) {
        messageService.SaveToDto(messageDto,other_id);
        return ResponseEntity.ok().build();
    }



    @PutMapping("/{id}")
    public Comment updateComment(@PathVariable Long id, @RequestBody Comment updatedcomment){
        /*if(commentRepository.existsById(id)){
            updatedcomment.setId(id);
            return commentRepository.save(updatedcomment);
        }*/
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id){
        //commentRepository.deleteById(id);
    }

}
