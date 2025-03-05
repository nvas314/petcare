package com.project.petcare.controller;

import com.project.petcare.service.PostService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/take")
@CrossOrigin(origins = "*")
public class GivePetController {
    PostService postService;

    public GivePetController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/institution/{post_id}/{i_id}")
    public void giveInstitution(@PathVariable Long i_id,@PathVariable Long post_id){
        postService.takePet(post_id,i_id,"i");
    }

    @GetMapping("/vet/{post_id}/{p_id}")
    public void giveProfessional(@PathVariable Long p_id,@PathVariable Long post_id){
        postService.takePet(post_id,p_id,"p");
    }

    @GetMapping("/common/{post_id}/{u_id}")
    public void giveUser(@PathVariable Long u_id,@PathVariable Long post_id){
        System.out.println("yes"+post_id);
        postService.takePet(post_id,u_id,"u");
    }
}
