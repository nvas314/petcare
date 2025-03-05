package com.project.petcare.projection;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.petcare.config.AppConstants.Post.PostStatus;

import java.sql.Timestamp;

public interface PostRes {
    Long getId();
    String getTitle();
    Double getLongitude();
    Double getLatitude();
    String getAnimal();
    String getBreed();
    PostStatus getStatus();
    String getDescription();
    Timestamp getTimestamp();
    String getCollarText();
    String getHealthCondition();
    Long getUserId();

    /*UserStats getUser();
    interface UserStats{
        String getUsername();
        String GetName();
        String GetSurname();
        String GetMiddleName();
    }*/
}
