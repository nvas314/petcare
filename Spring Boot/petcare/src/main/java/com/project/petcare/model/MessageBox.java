package com.project.petcare.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@Accessors(chain = true)
//@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"sender","reciever"}))
public class MessageBox {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    //@Column(unique = true)
    //private Long user_id;
    //@Column(unique = true)
    //private Long other_user_id;

    private Timestamp lastChange;
    private Timestamp lastSeen;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")//to User id
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "other_user_id")//to User id
    private User receiver;

}
