package com.project.petcare.service;

import com.project.petcare.model.Message;
import com.project.petcare.model.User;
import com.project.petcare.repository.MessageRepository;
import com.project.petcare.repository.UserRepository;
import com.project.petcare.request_dto.MessageDto;
import com.project.petcare.response_dto.ResMessageDto;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@Validated
public class MessageService {

    MessageRepository messageRepository;
    MessageBoxService messageBoxService;
    UserRepository userRepository;
    User fromuser;

    public MessageService(MessageRepository messageRepository, MessageBoxService messageBoxService, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.messageBoxService = messageBoxService;
        this.userRepository = userRepository;
    }

    public List<ResMessageDto> messageToDtoList(Long other_user_id){
        fromuser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Message> messages = messageRepository.findInIdOrOtherIdAndSortByTimeCreated(fromuser.getId(),other_user_id);
        List<ResMessageDto> resMessageDtos = new ArrayList<>();
        for(Message message:messages){
            ResMessageDto resMessageDto = new ResMessageDto();
            resMessageDto.setMessage(message.getMessage());
            resMessageDto.setTimestamp(message.getTimestamp());
            resMessageDto.setReceiverId(message.getReceiver().getId());
            resMessageDto.setSenderId(message.getSender().getId());
            resMessageDtos.add(resMessageDto);
        }
        messageBoxService.MakeMessagesRead(other_user_id,new Timestamp(System.currentTimeMillis()));
        return resMessageDtos;
    }

    public void SaveToDto(MessageDto messageDto,Long other_user_id){
        fromuser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User receiver = userRepository.findById(other_user_id).orElseThrow();
        Message message = new Message();
        message.setReceiver(receiver);
        message.setSender(fromuser);
        message.setMessage(messageDto.getMessage());
        messageRepository.save(message);
        messageBoxService.ChangeMessagesChangeTime(receiver,new Timestamp(System.currentTimeMillis()));
    }
}
