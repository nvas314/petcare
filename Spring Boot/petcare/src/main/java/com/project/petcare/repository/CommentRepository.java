package com.project.petcare.repository;

import com.project.petcare.model.Comment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends CrudRepository<Comment,Long> {//Crud??
    List<Comment> findAll();
    List<Comment> findByPostId(Long postId);
}
