package com.project.petcare.service;

import com.project.petcare.model.MessageBox;
import com.project.petcare.model.User;
import com.project.petcare.repository.MessageBoxRepository;
import com.project.petcare.repository.MessageRepository;
import com.project.petcare.repository.UserRepository;
import com.project.petcare.request_dto.MessageBoxDto;
import com.project.petcare.response_dto.ResMessageBoxDto;
import com.project.petcare.response_dto.ResUserDto;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Validated
public class MessageBoxService {

    MessageRepository messageRepository;
    MessageBoxRepository messageBoxRepository;

    public MessageBoxService(MessageRepository messageRepository, MessageBoxRepository messageBoxRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.messageBoxRepository = messageBoxRepository;
        this.userRepository = userRepository;
    }

    UserRepository userRepository;
    User fromuser;

    public void MakeMessagesRead(Long touserid, Timestamp lastRead){
        User touser = userRepository.findById(touserid).orElse(null);
        MessageBox messageBox = messageBoxRepository.findBySenderAndReceiver(fromuser,touser);
        if (messageBox == null) messageBox = new MessageBox();
        messageBox.setLastSeen(lastRead);
        messageBoxRepository.save(messageBox);
    }

    //for both users
    public void ChangeMessagesChangeTime(User other_user, Timestamp lastChanged){
        MessageBox messageBox = messageBoxRepository.findBySenderAndReceiver(other_user,fromuser);
        if (messageBox == null) messageBox = new MessageBox();
        messageBox.setSender(other_user);
        messageBox.setReceiver(fromuser);
        messageBox.setLastSeen(lastChanged);
        messageBox.setLastChange(lastChanged);
        messageBoxRepository.save(messageBox);
        messageBox = messageBoxRepository.findBySenderAndReceiver(fromuser,other_user);
        if (messageBox == null) messageBox = new MessageBox();
        messageBox.setSender(fromuser);
        messageBox.setReceiver(other_user);
        messageBox.setLastChange(lastChanged);
        messageBoxRepository.save(messageBox);
    }

    public List<ResMessageBoxDto> MsgBoxToDto(){
        fromuser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<MessageBox> messageboxes = messageBoxRepository.findBySender(fromuser);
        return messageboxes.stream().map(m ->
                new ResMessageBoxDto(
                        m.getId(),
                        m.getLastChange(),
                        m.getLastSeen(),
                new ResUserDto(
                        m.getReceiver().getId(),
                        m.getReceiver().getUsername(),
                        m.getReceiver().getName(),
                        m.getReceiver().getSurname(),
                        m.getReceiver().getMiddleName()
                )
        )).collect(Collectors.toList());
    }

    public void DtoToMsgBox(MessageBoxDto messageBoxDto){
        fromuser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User receiver = userRepository.findById(messageBoxDto.getReceiverId()).orElse(null);
        if(fromuser == receiver) return;//No msgBox to the same user
        MessageBox messageBox = new MessageBox();
        messageBox.setReceiver(receiver);
        messageBox.setSender(fromuser);
        Timestamp s = new Timestamp(System.currentTimeMillis());
        messageBox.setLastChange(s);
        messageBox.setLastSeen(s);
        messageBoxRepository.save(messageBox);
    }
}
