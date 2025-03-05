package com.project.petcare.request_dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.petcare.config.AppConstants;
import com.project.petcare.model.Post;
import com.project.petcare.model.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Accessors(chain = true)
public class GiveReqDto {
    private Long id;

    @Enumerated(EnumType.STRING)
    private AppConstants.Post.AnimalHolder toholder;//test

    private Long toanimalHolderId;

    private Long postid;

    private String title;
    private String message;
}
