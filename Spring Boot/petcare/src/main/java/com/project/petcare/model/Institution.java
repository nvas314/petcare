package com.project.petcare.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Entity
@Data
@Accessors(chain = true)
public class Institution {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false,unique = true)
    @NotBlank
    private String name;
    private String description;
    private String telephone;

    @Min(value = 18, message = "Coordinates of greece are 18-32 lon and 33-42 lat.")
    @Max(value = 32, message = "Coordinates of greece are 18-32 lon and 33-42 lat.")
    private double longitude;

    @Min(value = 33, message = "Coordinates of greece are 18-32 lon and 33-42 lat")
    @Max(value = 42, message = "Coordinates of greece are 18-32 lon and 33-42 lat.")
    private double latitude;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "institution",cascade = CascadeType.ALL)
    private List<InstOfficial> officials;
}
