package com.project.petcare.response_dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.petcare.config.AppConstants;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Accessors(chain = true)
public class ResUserDto {
    Long id;
    String username;
    String name;
    String surname;
    String middleName;
    String email;
    String telephone;
    String description;

    List<Long> instId;
    List<String> institution;
    Long profId;
    String profession;
    Double longitude;
    Double latitude;
    Date createdAt;

    @Enumerated(EnumType.STRING)
    private AppConstants.User.UserStatus status;

    @Enumerated(EnumType.STRING)
    private AppConstants.User.UserRole role;

    public ResUserDto(Long id, String username, String name, String surname, String middleName) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.middleName = middleName;
    }

    public ResUserDto(Long id,String name, String surname, String middleName, String profession, Long profId, Double longitude, Double latitude) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.middleName = middleName;
        this.profession = profession;
        this.profId = profId;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public ResUserDto(Long id, String username, String name, String surname, String middleName, AppConstants.User.UserStatus status, AppConstants.User.UserRole role,Date createdAt) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.middleName = middleName;
        this.status = status;
        this.role = role;
        this.createdAt = createdAt;
    }
}
