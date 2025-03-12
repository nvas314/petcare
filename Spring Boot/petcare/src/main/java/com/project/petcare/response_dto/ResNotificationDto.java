package com.project.petcare.response_dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.petcare.model.Post;
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
public class ResNotificationDto {
    private Long id;
    private Timestamp timestamp;
    private String title;
    private String message;
    private Long postId;

    public ResNotificationDto(Long id, Timestamp timestamp, String title, String message) {

        this.id = id;
        this.timestamp = timestamp;
        this.title = title;
        this.message = message;
    }
}
