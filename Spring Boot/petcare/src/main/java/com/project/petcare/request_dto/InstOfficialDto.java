package com.project.petcare.request_dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.petcare.config.AppConstants;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Accessors(chain = true)
public class InstOfficialDto {

    @NotNull
    @NotBlank
    private Long instId;
    private String description;

    @Enumerated(EnumType.STRING)
    private AppConstants.InstOfficial.InstOfficialType type = AppConstants.InstOfficial.InstOfficialType.APPLICATION;
}
