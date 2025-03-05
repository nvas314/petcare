package com.project.petcare.repository;

import com.project.petcare.model.Comment;
import com.project.petcare.model.Institution;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface InstitutionRepository extends CrudRepository<Institution,Long> {
    List<Institution> findAll();
    Institution findByName(String name);
}
