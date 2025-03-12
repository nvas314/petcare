package com.project.petcare.controller;

import com.project.petcare.request_dto.CommentDto;
import com.project.petcare.model.Comment;
import com.project.petcare.repository.CommentRepository;
import com.project.petcare.response_dto.ResCommentDto;
import com.project.petcare.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class CommentsController {

    private final CommentService commentService;

    @Autowired
    public CommentsController(CommentService commentService){
        this.commentService = commentService;
    }

    @GetMapping("/{post_id}")
    public List<ResCommentDto> getAllComments(@PathVariable Long post_id){
        return commentService.CommentToResDto(post_id);
    }

    @PostMapping("/user/{post_id}")
    public ResponseEntity<Object> addComment(@RequestBody CommentDto commentDto, @PathVariable Long post_id) {
        commentService.createComment(commentDto,post_id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/manage/{comment_id}")
    public void deleteComment(@PathVariable Long comment_id){
        commentService.DeleteComment(comment_id);
    }
}
