package com.project.petcare.response_dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Accessors(chain = true)
public class ResProfAppDto {
    private Long id;
    private Long userId;
    private Timestamp datetime;

    private String profession;
    private String description;
    private double longitude;
    private double latitude;
}
