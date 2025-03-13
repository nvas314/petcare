package com.project.petcare.model;

import com.project.petcare.config.AppConstants.User.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Data
@Accessors(chain = true)
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;


    @Column(nullable = false,unique = true)
    @Size(min = 4, max = 20)
    @NotBlank
    private String username;

    @Column(nullable = false)
    private String password;

    @Size(min = 2, max = 20)
    @NotNull
    @NotBlank
    private String name;

    @Size(min = 2, max = 20)
    @NotNull
    @NotBlank
    private String surname;

    private String middleName;
    private String telephone;

    @NotNull
    @NotBlank
    @Email
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
        switch (this.role){
            case COMMON -> {
                return List.of(new SimpleGrantedAuthority("ROLE_USER"));
            }
            case MANAGER -> {
                return List.of(new SimpleGrantedAuthority("ROLE_MANAGER"),
                        new SimpleGrantedAuthority("ROLE_USER"));
            }
            case APPROVER -> {
                return List.of(new SimpleGrantedAuthority("ROLE_APPROVER"),
                        new SimpleGrantedAuthority("ROLE_MANAGER"),
                        new SimpleGrantedAuthority("ROLE_USER"));
            }
            case ADMIN -> {
                return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"),
                        new SimpleGrantedAuthority("ROLE_APPROVER"),
                        new SimpleGrantedAuthority("ROLE_MANAGER"),
                        new SimpleGrantedAuthority("ROLE_USER"));
            }
        }
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }


    public String getEmail(Long user_id){
        if(this.showEmail || Objects.equals(user_id, this.id)){
            return email;
        }
        else {
            return null;
        }
    }

    public String getTelephone(Long user_id){
        if(this.showTelephone || Objects.equals(user_id, this.id)){
            return telephone;
        }
        else {
            return null;
        }
    }

}
