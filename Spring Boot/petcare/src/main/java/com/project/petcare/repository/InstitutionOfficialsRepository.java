package com.project.petcare.repository;

import com.project.petcare.model.InstOfficial;
import com.project.petcare.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface InstitutionOfficialsRepository extends CrudRepository<InstOfficial,Long> {
    InstOfficial findByUser(User user);
    InstOfficial findByUserId(Long userId);

    @Query(value = "Select * From inst_official " +
            "Where inst_official.type = 'APPLICATION' ", nativeQuery = true)
    List<InstOfficial> findAllApplications();

    @Query(value = "Select * From inst_official " +
            "Where inst_official.type != 'APPLICATION' " +
            "Order By type asc", nativeQuery = true)
    List<InstOfficial> findAllEmployees();
}
