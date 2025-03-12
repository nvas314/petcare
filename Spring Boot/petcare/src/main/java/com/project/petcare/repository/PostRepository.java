package com.project.petcare.repository;

import com.project.petcare.config.AppConstants;
import com.project.petcare.model.Post;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PostRepository extends CrudRepository<Post,Long> {
    List<Post> findByType(AppConstants.Post.PostType type);
    List<Post> findByStatus(AppConstants.Post.PostStatus status);
    List<Post> findByAnimalHolderIdAndHolder(Long animalHolderId, AppConstants.Post.AnimalHolder holder);
}
