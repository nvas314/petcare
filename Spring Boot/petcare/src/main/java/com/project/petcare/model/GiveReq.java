package com.project.petcare.model;

import com.project.petcare.config.AppConstants;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Data
@Accessors(chain = true)
public class GiveReq {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Enumerated(EnumType.STRING)
    private AppConstants.Post.AnimalHolder toholder = AppConstants.Post.AnimalHolder.COMMON;

    private Long toanimalHolderId;

    @CreationTimestamp
    private Timestamp timestamp;
}
