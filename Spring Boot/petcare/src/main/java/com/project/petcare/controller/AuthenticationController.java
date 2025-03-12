package com.project.petcare.controller;

import com.project.petcare.request_dto.LoginResponse;
import com.project.petcare.request_dto.LoginUserDto;
import com.project.petcare.request_dto.RegisterUserDto;
import com.project.petcare.model.User;
import com.project.petcare.service.AuthenticationService;
import com.project.petcare.service.JwtService;
import com.project.petcare.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequestMapping("/auth")
@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class AuthenticationController {


    private final AuthenticationService authenticationService;
    private final JwtService jwtService;
    private final UserService userService;

    public AuthenticationController(AuthenticationService authenticationService, JwtService jwtService, UserService userService) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {

        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }


    @PostMapping("/signup/image/select/{user_id}")
    public ResponseEntity<Object> addImageToNewAccount(@RequestPart("image") List<MultipartFile> mpf , @PathVariable Long user_id) throws IOException, InterruptedException {
        userService.setAccountImageUser(mpf,user_id);
        return ResponseEntity.ok().build();
    }
}
