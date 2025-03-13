package com.project.petcare.model;

import com.project.petcare.config.AppConstants;
import com.project.petcare.config.AppConstants.Post.PostType;
import com.project.petcare.config.AppConstants.Post.PostStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.sql.Timestamp;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Entity
@Data
@Accessors(chain = true)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 4, max = 30)
    @NotBlank
    private String title;
    private String animalName;

    @NotNull
    @Min(value = 18, message = "Coordinates of greece are 18-32 lon and 33-42 lat.")
    @Max(value = 32, message = "Coordinates of greece are 18-32 lon and 33-42 lat.")
    private double longitude;

    @NotNull
    @Min(value = 33, message = "Coordinates of greece are 18-32 lon and 33-42 lat")
    @Max(value = 42, message = "Coordinates of greece are 18-32 lon and 33-42 lat.")
    private double latitude;

    @NotNull
    @NotBlank
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

    public PostStatus getStatus() {
        if(status == PostStatus.MISSING && type == PostType.FOUND){
            Timestamp now = new Timestamp(System.currentTimeMillis());
            int days = (int) TimeUnit.MILLISECONDS.toDays(
                    System.currentTimeMillis() - timestamp.getTime());
            if(days > 365){ //After of 1 year of finding the pet, it can be adopted
                return PostStatus.ADOPTION;
            }
        }
        return status;
    }
}
