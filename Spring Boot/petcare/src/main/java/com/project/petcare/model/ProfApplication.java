package com.project.petcare.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.experimental.Accessors;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Data
@Accessors(chain = true)
public class ProfApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private Timestamp datetime;
    @NotNull
    @NotBlank
    private String profession;
    private String description;

    @NotNull
    @Min(value = 18, message = "Coordinates of greece are 18-32 lon and 33-42 lat.")
    @Max(value = 32, message = "Coordinates of greece are 18-32 lon and 33-42 lat.")
    private double longitude;

    @NotNull
    @Min(value = 33, message = "Coordinates of greece are 18-32 lon and 33-42 lat")
    @Max(value = 42, message = "Coordinates of greece are 18-32 lon and 33-42 lat.")
    private double latitude;
}
