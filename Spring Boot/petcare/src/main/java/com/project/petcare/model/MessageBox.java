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
public class MessageBox {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Timestamp lastChange;
    private Timestamp lastSeen;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")//to User id
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "other_user_id")//to User id
    private User receiver;

}
