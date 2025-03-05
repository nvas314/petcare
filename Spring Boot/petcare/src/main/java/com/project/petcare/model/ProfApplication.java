package com.project.petcare.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Data
@Accessors(chain = true)
public class ProfApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private Timestamp datetime;

    private String profession;
    private String description;
    private double longitude;
    private double latitude;
}
