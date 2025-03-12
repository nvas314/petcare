package com.project.petcare.controller;

import com.project.petcare.config.AppConstants;
import com.project.petcare.request_dto.PostDto;
import com.project.petcare.model.Post;
import com.project.petcare.repository.PostRepository;
import com.project.petcare.response_dto.ResPostDto;
import com.project.petcare.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService){
        this.postService = postService;
    }

    @GetMapping("/lost")
    public List<ResPostDto> getAllLostPosts(){
        return postService.FindLostPosts();
    }

    @GetMapping("/found")
    public List<ResPostDto> getAllFoundPosts(){
        return postService.FindFoundPosts();
    }

    @GetMapping("/user/own") //Get all user created posts
    public List<ResPostDto> getOwnPosts(){
        return postService.ShowOwnPosts();
    }

    @PostMapping("/user/new")
    public ResponseEntity<Object> addLostPost(@RequestPart("metadata") PostDto postDto,
                                              @RequestPart("image") List<MultipartFile> mpf) throws IOException {
        postService.createPost(postDto,mpf);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/images/{post_id}") //Get post images
    public ResponseEntity<List<String>> getPostImage(@PathVariable String post_id) throws IOException {
        List<String> images = postService.getAllImages(post_id);
        return ResponseEntity.ok(images);
    }

    @GetMapping("/{id}")
    public ResPostDto findPost(@PathVariable Long id){
        return postService.FindPost(id);
    }

    @GetMapping("/user/set/{post_id}/{status}")
    public void setPostStatus(@PathVariable Long post_id,@PathVariable String status){
        postService.setPostStatus(post_id,status);
    }

    @DeleteMapping("/manage/{id}")
    public void deletePost(@PathVariable Long id){
        postService.DeletePost(id);
    }

}
