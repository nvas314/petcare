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

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Accessors(chain = true)
public class ResInstOfficialAppsDto {
    private Long id;
    private Long userId;
    private Long instId;
    private String instName;
    private String description;
    private Date datetime;

    @Enumerated(EnumType.STRING)
    private AppConstants.InstOfficial.InstOfficialType type = AppConstants.InstOfficial.InstOfficialType.APPLICATION;
}
