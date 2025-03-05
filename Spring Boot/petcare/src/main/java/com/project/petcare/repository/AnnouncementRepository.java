package com.project.petcare.repository;

import com.project.petcare.model.Announcement;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AnnouncementRepository extends CrudRepository<Announcement,Long> {
    List<Announcement> findAll();
}
