package com.project.petcare.repository;

import com.project.petcare.model.ProfApplication;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ProfAppRepository extends CrudRepository<ProfApplication,Long> {
    ProfApplication findByUserId(Long userId);
}
