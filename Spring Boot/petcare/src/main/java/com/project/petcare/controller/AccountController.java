package com.project.petcare.controller;

import com.project.petcare.config.AppConstants;
import com.project.petcare.model.User;
import com.project.petcare.repository.UserRepository;
import com.project.petcare.request_dto.ChangeAccountSettingsDto;
import com.project.petcare.request_dto.UserChangesDto;
import com.project.petcare.response_dto.ResUserDto;
import com.project.petcare.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/account")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class AccountController {

    UserService userService;

    public AccountController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/details")
    public ResUserDto authenticateToken() {
        return userService.ReturnLoggedInUserDetails();
    }

    @PutMapping("/user/edit")
    public void changeDetails(@RequestBody UserChangesDto changes) {
        userService.editUser(changes);
    }

    @PutMapping("/user/changesettings")
    public void changeUserSettings(@RequestBody ChangeAccountSettingsDto changes) {
        userService.changeAccountSettings(changes);
    }

    @GetMapping("/user/image/{user_id}")
    public ResponseEntity<List<String>> getPostImage(@PathVariable Long user_id) throws IOException {
        System.out.println("Looking for image: ");
        List<String> image = userService.getAccountImage(user_id);
        return ResponseEntity.ok(image);
    }

    @PostMapping("/user/new/image")
    public ResponseEntity<Object> addLostPost(@RequestPart("image") List<MultipartFile> mpf) throws IOException, InterruptedException {
        userService.setAccountImage(mpf);
        return ResponseEntity.ok().build();
    }



}
