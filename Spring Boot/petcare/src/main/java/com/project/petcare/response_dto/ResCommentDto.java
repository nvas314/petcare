package com.project.petcare.response_dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.petcare.projection.CommentRes;
import com.project.petcare.projection.PostRes;
import com.project.petcare.projection.UserCommonView;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Accessors(chain = true)
public class ResCommentDto{


    private Long id;
    private Timestamp timestamp;
    private String comment;

    private Long userid;
    private String username;
    private String name;
    private String surname;
    private String middleName;
}
