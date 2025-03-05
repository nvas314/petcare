package com.project.petcare.controller;

import com.project.petcare.model.Comment;
import com.project.petcare.model.Message;
import com.project.petcare.model.MessageBox;
import com.project.petcare.model.User;
import com.project.petcare.projection.MessageBoxView;
import com.project.petcare.repository.MessageBoxRepository;
import com.project.petcare.repository.MessageRepository;
import com.project.petcare.request_dto.MessageBoxDto;
import com.project.petcare.request_dto.MessageDto;
import com.project.petcare.response_dto.ResMessageBoxDto;
import com.project.petcare.response_dto.ResMessageDto;
import com.project.petcare.service.MessageBoxService;
import com.project.petcare.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/boxmessages")
@CrossOrigin(origins = "http://localhost:4200")
public class MessageBoxController {

    MessageBoxRepository messageBoxRepository;

    public MessageBoxController(MessageBoxRepository messageBoxRepository, MessageBoxService messageboxService) {
        this.messageBoxRepository = messageBoxRepository;
        this.messageboxService = messageboxService;
    }

    MessageBoxService messageboxService;


    @GetMapping("/")
    public List<ResMessageBoxDto> getUserMessageBoxes(){
        return messageboxService.MsgBoxToDto();
    }

    @PostMapping("/")
    public ResponseEntity<MessageBox> addMessageBox(@RequestBody MessageBoxDto messageBoxDto) {
        if(messageBoxDto.getReceiverId() == null) return null; //Missing values
        messageboxService.DtoToMsgBox(messageBoxDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public void deleteMessageBox(@PathVariable Long id){
        messageBoxRepository.deleteById(id);
    }
}
