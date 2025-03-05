package com.project.petcare.repository;

import com.project.petcare.config.AppConstants;
import com.project.petcare.model.Comment;
import com.project.petcare.model.GiveReq;
import com.project.petcare.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface GiveReqRepository extends CrudRepository<GiveReq,Long> {
    List<GiveReq> findByToanimalHolderIdAndToholder(Long toanimalHolderId, AppConstants.Post.AnimalHolder toholder);
}
