package com.project.petcare.model;

import com.project.petcare.config.AppConstants.User.*;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Accessors(chain = true)
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;
    @Column(nullable = false,unique = true)
    private String username;
    @Column(nullable = false)
    private String password;
    private String name;
    private String surname;
    private String middleName;
    private String telephone;
    private String email;
    private String description;

    @Enumerated(EnumType.STRING)
    private UserStatus status = UserStatus.ACTIVE;

    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.COMMON;

    private boolean showTelephone = true;
    private boolean showEmail = true;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "user",cascade = CascadeType.ALL)
    List<Post> posts;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "user",cascade = CascadeType.ALL)
    List<Comment> comments;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "sender",cascade = CascadeType.ALL)
    List<MessageBox> messageBoxesSender;
    @OneToMany(fetch = FetchType.EAGER,mappedBy = "receiver",cascade = CascadeType.ALL)
    List<MessageBox> messageBoxesReceiver;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "sender",cascade = CascadeType.ALL)
    List<Message> messagesSender;
    @OneToMany(fetch = FetchType.EAGER,mappedBy = "receiver",cascade = CascadeType.ALL)
    List<Message> messagesReceiver;


    @OneToOne(fetch = FetchType.EAGER,mappedBy = "user",cascade = CascadeType.ALL)
    Profession profession;
    @OneToOne(fetch = FetchType.EAGER,mappedBy = "user",cascade = CascadeType.ALL)
    ProfApplication professionApp;


    @OneToMany(fetch = FetchType.EAGER,mappedBy = "user",cascade = CascadeType.ALL)
    List<InstOfficial> institutionEmployees;


    @OneToMany(fetch = FetchType.EAGER,mappedBy = "user",cascade = CascadeType.ALL)
    List<Notification> notifications;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    public String getEmail(){
        if(this.showEmail){
            return email;
        }
        else {
            return null;
        }
    }

    public String getTelephone(){
        if(this.showTelephone){
            return telephone;
        }
        else {
            return null;
        }
    }

}
