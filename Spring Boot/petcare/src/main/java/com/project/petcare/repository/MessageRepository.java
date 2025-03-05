package com.project.petcare.repository;

import com.project.petcare.model.Message;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MessageRepository  extends CrudRepository<Message,Long> {

    @Query(value = "Select * From message " +
            "Where (message.send_id = :id and message.receive_id = :receive) " +
            "or (message.receive_id = :id and message.send_id = :receive) " +
            "Order By timestamp asc", nativeQuery = true)
    List<Message> findInIdOrOtherIdAndSortByTimeCreated(Long id,Long receive);
}
