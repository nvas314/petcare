package com.project.petcare.controller;

import com.project.petcare.request_dto.UserChangesDto;
import com.project.petcare.response_dto.ResUserDto;
import com.project.petcare.service.UserService;
import com.project.petcare.model.User;
import com.project.petcare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UsersController {


    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public UsersController(UserRepository userRepository, UserService userService){
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping("/admin/all")
    public List<ResUserDto> getAllUsers(){//admin users can see all the users,we can filter tht for common users
        return userService.usersToDto();
    }

    @GetMapping("/common/search/{name}")// common is where the common users can go
    public List<ResUserDto> searchAllUsersShared(@PathVariable String name){
        System.out.println(name);
        return userService.searchUser(name);//We can filter the shared users if we want
    }

    @PostMapping
    public User addUser(@RequestBody User user){
        return userRepository.save(user);
    }

    @GetMapping("/admin/{id}")
    public ResUserDto findUserCritical(@PathVariable Long id){
        return userService.userToDto(id);
    }

    @GetMapping("/common/{id}")
    public ResUserDto findUserShared(@PathVariable Long id){
        User user = userRepository.findById(id).orElse(null);
        assert user != null;
        return userService.UserToSharedDto(user);
    }

    @GetMapping("/auth/me")
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(currentUser);
    }

    @GetMapping("/auth")
    public ResponseEntity<List<User>> allUsers() {
        List <User> users = userService.allUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/admin/{id}")
    public void deleteUser(@PathVariable Long id){
        userRepository.deleteById(id);
    }

    @PutMapping("/admin/change/role/{user_id}")
    public void changeUserRole(@PathVariable Long user_id,@RequestBody UserChangesDto changes){
        userService.changeUserRole(changes,user_id);
    }

    @PutMapping("/manage/change/status/{user_id}")
    public void changeUserStatus(@PathVariable Long user_id,@RequestBody UserChangesDto changes){
        userService.changeUserStatus(changes,user_id);
    }

}
