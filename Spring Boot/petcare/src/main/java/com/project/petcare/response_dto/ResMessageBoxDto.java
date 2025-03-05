package com.project.petcare.response_dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.petcare.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Accessors(chain = true)
public class ResMessageBoxDto {
    private Long id;
    private Timestamp lastChange;
    private Timestamp lastSeen;
    private ResUserDto receiver;
}
