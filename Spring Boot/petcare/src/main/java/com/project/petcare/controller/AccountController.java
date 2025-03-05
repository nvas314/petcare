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
@CrossOrigin(origins = "http://localhost:4200")
public class AccountController {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    UserService userService;

    public AccountController(UserRepository userRepository, PasswordEncoder passwordEncoder, UserService userService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    @GetMapping("/details")
    public ResUserDto authenticateToken() {
        User u = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(u.getId()).orElseThrow();
        ResUserDto resUserDto = new ResUserDto();
        resUserDto.setId(user.getId());
        resUserDto.setUsername(user.getUsername());
        resUserDto.setName(user.getName());
        resUserDto.setMiddleName(user.getMiddleName());
        resUserDto.setSurname(user.getSurname());
        resUserDto.setStatus(user.getStatus());
        resUserDto.setRole(user.getRole());

        return resUserDto;
    }

    @PutMapping("/edit")
    public void changeDetails(@RequestBody UserChangesDto changes) {
        userService.editUser(changes);
    }

    @PutMapping("/changesettings")
    public void changeUserSettings(@RequestBody ChangeAccountSettingsDto changes) {
        userService.changeAccountSettings(changes);
    }

    @DeleteMapping("/delete")
    public void deleteUser() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        user.setStatus(AppConstants.User.UserStatus.DELETED);
        user.setPassword(null);
        userRepository.save(user);
    }

    @GetMapping("/image/{user_id}")
    public ResponseEntity<List<String>> getPostImage(@PathVariable Long user_id) throws IOException {
        System.out.println("Looking for image: ");
        List<String> image = userService.getAccountImage(user_id);
        return ResponseEntity.ok(image);
    }

    @PostMapping("/new/image")
    public ResponseEntity<Object> addLostPost(@RequestPart("image") List<MultipartFile> mpf) throws IOException, InterruptedException {
        userService.setAccountImage(mpf);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/new/image/select/{user_id}")
    public ResponseEntity<Object> addImageToNewAccount(@RequestPart("image") List<MultipartFile> mpf , @PathVariable Long user_id) throws IOException, InterruptedException {
        userService.setAccountImageUser(mpf,user_id);
        return ResponseEntity.ok().build();
    }


}
