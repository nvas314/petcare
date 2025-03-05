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
@CrossOrigin(origins = "http://localhost:4200")
public class CommentsController {


    private final CommentRepository commentRepository;
    private final CommentService commentService;

    @Autowired
    public CommentsController(CommentRepository cr, CommentService commentService){
        this.commentRepository = cr;
        this.commentService = commentService;
    }

    @GetMapping("/{post_id}")
    public List<ResCommentDto> getAllComments(@PathVariable Long post_id){
        List<Comment> comments = commentRepository.findByPostId(post_id);
        return commentService.CommentToResDto(comments);
    }

    @PostMapping("/{post_id}")
    public ResponseEntity<Object> addComment(@RequestBody CommentDto commentDto, @PathVariable Long post_id) {
        if(commentDto.getComment() == null) return null; //Missing values
        Comment comment = commentService.createComment(commentDto,post_id);
        commentRepository.save(comment);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public Comment updateComment(@PathVariable Long id, @RequestBody Comment updatedcomment){
        if(updatedcomment.getComment() == null ||updatedcomment.getUser() == null ) return null; //Missing values
        if(commentRepository.existsById(id)){
            updatedcomment.setId(id);
            return commentRepository.save(updatedcomment);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id){
        commentRepository.deleteById(id);
    }
}
