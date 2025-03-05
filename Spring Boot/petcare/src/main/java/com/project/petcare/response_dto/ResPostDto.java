package com.project.petcare.response_dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.petcare.config.AppConstants;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Accessors(chain = true)
public class ResPostDto {

    private Long id;
    private String title;
    private String animalName;

    private Double longitude;
    private Double latitude;

    private String animal;
    private String breed;

    private AppConstants.Post.PostStatus status;

    private Timestamp timestamp;
    private String collarText;
    private String description;
    private String healthCondition;
    @Enumerated(EnumType.STRING)
    private AppConstants.Post.AnimalHolder holder = AppConstants.Post.AnimalHolder.COMMON;
    @Enumerated(EnumType.STRING)
    private AppConstants.Post.PostType type;
    private Long animalHolderId;//userId,profId,instId

    private String username;
    private String name;
    private String surname;
    private String middleName;

    private String profession;
    private String instName;
}
