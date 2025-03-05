package com.project.petcare.model;

import com.project.petcare.config.AppConstants;
import com.project.petcare.config.AppConstants.Post.PostType;
import com.project.petcare.config.AppConstants.Post.PostStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.experimental.Accessors;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@Accessors(chain = true)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String title;
    private String animalName;
    private Double longitude;
    private Double latitude;
    @NotNull
    private String animal;
    private String breed;
    @Enumerated(EnumType.STRING)
    private PostType type = PostType.LOST;
    @Enumerated(EnumType.STRING)
    private PostStatus status = PostStatus.MISSING;
    @Enumerated(EnumType.STRING)
    private AppConstants.Post.AnimalHolder holder = AppConstants.Post.AnimalHolder.COMMON;
    private Long animalHolderId;//Goes for userId, instId or profId depending on the hold variable above

    private Timestamp timestamp;
    private String collarText;
    private String description;
    private String healthCondition;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")//to User id
    private User user;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "post",cascade = CascadeType.ALL)
    List<Comment> comments;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "post",cascade = CascadeType.ALL)
    List<Notification> notifications;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "post",cascade = CascadeType.ALL)
    List<Announcement> announcements;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "post",cascade = CascadeType.ALL)
    List<GiveReq> giveReq;
}
