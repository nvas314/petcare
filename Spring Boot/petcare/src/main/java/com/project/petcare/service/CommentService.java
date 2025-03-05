package com.project.petcare.service;

import com.project.petcare.request_dto.CommentDto;
import com.project.petcare.model.Comment;
import com.project.petcare.model.User;
import com.project.petcare.repository.CommentRepository;
import com.project.petcare.repository.PostRepository;
import com.project.petcare.response_dto.ResCommentDto;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@Validated
public class CommentService {

    CommentRepository commentRepository;
    PostRepository postRepository;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }


    public Comment createComment(CommentDto commentDto,Long post_id){

        User fromuser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Comment comment = new Comment();
        comment.setComment(commentDto.getComment());
        comment.setPost(postRepository.findById(post_id).orElseThrow());
        comment.setUser(fromuser);

        if (comment.getUser() == null || comment.getPost() == null){
            return null;
        }
        return comment;
    }

    public List<ResCommentDto> CommentToResDto(List<Comment> comments){
        List<ResCommentDto> reslist = new ArrayList<ResCommentDto>();
        for(Comment comment : comments){
            ResCommentDto resCommentDto = new ResCommentDto();
            resCommentDto.setId(comment.getId());
            resCommentDto.setTimestamp(comment.getTimestamp());
            resCommentDto.setComment(comment.getComment());

            resCommentDto.setUserid(comment.getUser().getId());
            resCommentDto.setUsername(comment.getUser().getUsername());
            resCommentDto.setName(comment.getUser().getName());
            resCommentDto.setSurname(comment.getUser().getSurname());
            resCommentDto.setMiddleName(comment.getUser().getMiddleName());
            reslist.add(resCommentDto);
        }
        return reslist;
    }
}
