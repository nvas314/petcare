package com.project.petcare.repository;

import com.project.petcare.model.Notification;
import com.project.petcare.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface NotificationRepository extends CrudRepository<Notification,Long> {
    List<Notification> findAll();
    List<Notification> findByUser(User user);
}
