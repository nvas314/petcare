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
@CrossOrigin(origins = "*")
public class PostController {

    private final PostService postService;
    private final PostRepository postRepository;

    @Autowired
    public PostController(PostService postService, PostRepository nr){
        this.postService = postService;
        this.postRepository = nr;
    }

    @GetMapping("/lost")
    public List<ResPostDto> getAllLostPosts(){
        List<Post> postsRepo = postRepository.findByType(AppConstants.Post.PostType.LOST);
        List<ResPostDto> resPostDto;
        resPostDto = postService.PostToResDtoList(postsRepo);
        return resPostDto;
    }

    @GetMapping("/found")
    public List<ResPostDto> getAllFoundPosts(){
        List<Post> postsRepo = postRepository.findByType(AppConstants.Post.PostType.FOUND);
        return postService.PostToResDtoList(postsRepo);
    }

    @GetMapping("/own")
    public List<ResPostDto> getOwnPosts(){
        return postService.ShowOwnPosts();
    }

    @PostMapping("/new")
    public ResponseEntity<Object> addLostPost(@RequestPart("metadata") PostDto postDto,
                                              @RequestPart("image") List<MultipartFile> mpf) throws IOException {
        postService.createPost(postDto,mpf);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/images/{post_id}")
    public ResponseEntity<List<String>> getPostImage(@PathVariable String post_id) throws IOException {
        System.out.println("Looking for image: ");
        List<String> images = postService.getAllImages(post_id);
        return ResponseEntity.ok(images);
    }

    @GetMapping("/{id}")
    public ResPostDto findPost(@PathVariable Long id){
        Post post = postRepository.findById(id).orElse(null);
        assert post != null;
        return postService.PostToResDto(post);
    }

    @PutMapping("/{id}")
    public Post updatePost(@PathVariable Long id, @RequestBody Post updatedpost){
        if(postRepository.existsById(id)){
            updatedpost.setId(id);
            return postRepository.save(updatedpost);
        }
        return null;
    }

    @GetMapping("/set/{post_id}/{status}")
    public void setPostStatus(@PathVariable Long post_id,@PathVariable String status){
        postService.setPostStatus(post_id,status);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id){
        postRepository.deleteById(id);
    }

}
