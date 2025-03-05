package com.project.petcare.model;

import jakarta.persistence.*;
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

    private String name;
    private String description;
    private double longitude;
    private double latitude;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "institution",cascade = CascadeType.ALL)
    private List<InstOfficial> officials;
}
