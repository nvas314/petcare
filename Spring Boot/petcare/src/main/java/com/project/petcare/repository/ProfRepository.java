package com.project.petcare.repository;

import com.project.petcare.model.Message;
import com.project.petcare.model.ProfApplication;
import com.project.petcare.model.Profession;
import com.project.petcare.model.User;
import org.springframework.data.repository.CrudRepository;

public interface ProfRepository extends CrudRepository<Profession,Long> {
    Profession findByUser(User user);
}
