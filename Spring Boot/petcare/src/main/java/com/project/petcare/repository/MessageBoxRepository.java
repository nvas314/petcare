package com.project.petcare.repository;

import com.project.petcare.model.MessageBox;
import com.project.petcare.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MessageBoxRepository extends CrudRepository<MessageBox,Long> {
    List<MessageBox> findBySender(User sender);
    List<MessageBox> findByReceiver(User receiver);
    MessageBox findBySenderAndReceiver(User sender, User receiver);
}
