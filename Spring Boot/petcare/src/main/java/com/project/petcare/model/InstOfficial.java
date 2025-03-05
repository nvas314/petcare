package com.project.petcare.model;

import com.project.petcare.config.AppConstants;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Accessors(chain = true)
public class InstOfficial {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inst_id")
    private Institution institution;

    private String description;

    @Enumerated(EnumType.STRING)
    private AppConstants.InstOfficial.InstOfficialType type = AppConstants.InstOfficial.InstOfficialType.APPLICATION;

    private Timestamp datetime;
}
