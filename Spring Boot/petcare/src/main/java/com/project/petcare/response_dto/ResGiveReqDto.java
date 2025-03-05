package com.project.petcare.response_dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.petcare.config.AppConstants;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Accessors(chain = true)
public class ResGiveReqDto {
    private Long id;

    private Long postid;

    @Enumerated(EnumType.STRING)
    private AppConstants.Post.AnimalHolder toholder;

    private Long toanimalHolderId;
}
