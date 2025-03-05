package com.project.petcare.request_dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.petcare.config.AppConstants;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Accessors(chain = true)
public class UserChangesDto {
    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private AppConstants.User.UserStatus status;

    @Enumerated(EnumType.STRING)
    private AppConstants.User.UserRole role;

    private String name;
    private String surname;
    private String middleName;
    private String description;

}
