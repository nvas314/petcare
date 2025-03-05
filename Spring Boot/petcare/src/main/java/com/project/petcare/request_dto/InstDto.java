package com.project.petcare.request_dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Accessors(chain = true)
public class InstDto {
    @NotNull
    @NotBlank
    private String name;
    private String description;

    @NotNull
    @NotBlank
    @DecimalMin(value = "34.0",message = "The Longitude value must be inside the values 18 and 28 for Greece")
    @DecimalMax(value = "42.0",message = "The Longitude value must be inside the values 18 and 28 for Greece")
    private Double longitude;
    @NotNull
    @NotBlank
    @DecimalMin(value = "18.0",message = "The Latitude value must be inside the values 35 and 42 for Greece")
    @DecimalMax(value = "30.0",message = "The Latitude value must be inside the values 35 and 42 for Greece")
    private Double latitude;
}
