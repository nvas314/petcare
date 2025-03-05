package com.project.petcare.request_dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.petcare.config.AppConstants;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Accessors(chain = true)
public class PostDto {

    @NotNull
    @NotBlank
    private String title;
    private String animalName;

    @DecimalMin(value = "18.0",message = "The Longitude value must be inside the values 18 and 28 for Greece")
    @DecimalMax(value = "28.0",message = "The Longitude value must be inside the values 18 and 28 for Greece")
    private Double longitude;
    @DecimalMin(value = "35.0",message = "The Latitude value must be inside the values 35 and 42 for Greece")
    @DecimalMax(value = "42.0",message = "The Latitude value must be inside the values 35 and 42 for Greece")
    private Double latitude;

    @NotNull
    @NotBlank
    private String animal;
    private String breed;

    private AppConstants.Post.PostType type;
    private AppConstants.Post.PostStatus status;

    private Timestamp timestamp;
    private String collarText;
    private String description;
    private String healthCondition;

    private String instName;
    @Enumerated(EnumType.STRING)
    private AppConstants.Post.AnimalHolder holder = AppConstants.Post.AnimalHolder.COMMON;


    @Size(min = 0 ,max = 5)
    private List<MultipartFile> images;
}
