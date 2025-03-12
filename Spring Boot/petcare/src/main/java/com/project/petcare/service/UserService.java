package com.project.petcare.service;

import com.project.petcare.config.AppConstants;
import com.project.petcare.model.User;
import com.project.petcare.repository.UserRepository;
import com.project.petcare.request_dto.ChangeAccountSettingsDto;
import com.project.petcare.request_dto.UserChangesDto;
import com.project.petcare.response_dto.ResUserDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Validated
public class UserService {

    @Value("${file.image.path.account}")
    String imagePath; //Constant

    private final UserRepository userRepository;
    private final NotificationService notificationService;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, NotificationService notificationService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.passwordEncoder = passwordEncoder;
    }

    public ResUserDto FindUser(Long id){
        User user = userRepository.findById(id).orElseThrow();
        return UserToSharedDto(user);
    }


    public ResUserDto UserToSharedDto(User user){
        User my_user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ResUserDto shUserDto = new ResUserDto();
        shUserDto.setId(user.getId());
        shUserDto.setUsername(user.getUsername());
        shUserDto.setName(user.getName());
        shUserDto.setSurname(user.getSurname());
        shUserDto.setMiddleName(user.getMiddleName());
        shUserDto.setTelephone(user.getTelephone(my_user.getId()));
        shUserDto.setEmail(user.getEmail(my_user.getId()));
        shUserDto.setStatus(user.getStatus());
        if(user.getProfession() != null){
            shUserDto.setProfId(user.getProfession().getId());
            shUserDto.setProfession(user.getProfession().getProfession());
        }
        if(user.getInstitutionEmployees() != null){
            shUserDto.setInstId(
                    user.getInstitutionEmployees().stream().map(
                            empl -> empl.getInstitution().getId()
                    ).toList());
            shUserDto.setInstitution(
                    user.getInstitutionEmployees().stream().map(
                            empl -> empl.getInstitution().getName()
                    ).toList());
        }

        return shUserDto;
    }

    public List<ResUserDto> usersToDto(){
        List<User> users = userRepository.findAll();
        return users.stream().map(u ->
                new ResUserDto(
                        u.getId(),
                        u.getUsername(),
                        u.getName(),
                        u.getSurname(),
                        u.getMiddleName(),
                        u.getStatus(),
                        u.getRole(),
                        u.getCreatedAt()
                )).collect(Collectors.toList());
    }

    public List<ResUserDto> searchUser(String name){
        List<ResUserDto> resUserDtos = usersToDto();
        List<ResUserDto> searchResults = new ArrayList<>();
        for(ResUserDto dto:resUserDtos){
            if(dto.getName().toLowerCase().contains(name)){
                searchResults.add(dto);
            }
            else if(dto.getMiddleName().toLowerCase().contains(name)){
                searchResults.add(dto);
            }
            else if(dto.getSurname().toLowerCase().contains(name)){
                searchResults.add(dto);
            }
        }
        return searchResults;
    }

    public ResUserDto userToDto(Long id){
        User user = userRepository.findById(id).orElseThrow();
        return new ResUserDto(
                user.getId(),
                user.getUsername(),
                user.getName(),
                user.getSurname(),
                user.getMiddleName(),
                user.getStatus(),
                user.getRole(),
                user.getCreatedAt()
        );
    }

    public List<String> getAccountImage(Long userId){
        InputStream is;
        List<byte[]> images = new ArrayList<>();
        String Path = "C:\\data\\account\\"+userId+"\\image"; //Image path
        try {
            is = new FileInputStream(Path);
            images.add(is.readAllBytes());
        } catch (IOException ignored) {
            return null;
        }
        List<String> base64images = new ArrayList<>();
        for(byte[] image : images){
            base64images.add(Base64.getEncoder().encodeToString(image));
        }
        return base64images;
    }

    public void setAccountImage(List<MultipartFile> mpf) throws IOException, InterruptedException {//For change account image
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        setAccountImageUser(mpf,user.getId());
    }

    public void setAccountImageUser(List<MultipartFile> mpf,Long user_id) throws IOException, InterruptedException {//For Sign Up
        String Path = imagePath +"/"+user_id+"/";
        new File(Path).mkdirs();
        System.gc();
        Thread.sleep(100); //ensure the file is not locked (used by Spring) before deleted
        Files.deleteIfExists(java.nio.file.Path.of(Path + "image"));
        for(MultipartFile mpfile : mpf){
            new File(Path).mkdirs();
            mpfile.transferTo(new File(Path + "image"));
        }
    }

    public void editUser(UserChangesDto dto){
        User u = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(u.getId()).orElseThrow();
        user.setUsername(dto.getUsername());
        user.setName(dto.getName());
        user.setMiddleName(dto.getMiddleName());
        user.setSurname(dto.getSurname());
        user.setDescription(dto.getDescription());
        user.setTelephone(dto.getTelephone());
        user.setEmail(dto.getEmail());
        if(dto.getPassword() != null){
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }
        userRepository.save(user);
    }

    public void changeUserStatus(UserChangesDto dto,Long user_id){
        User user = userRepository.findById(user_id).orElseThrow();
        if(dto.getStatus() == null) return;
        if(dto.getStatus() == AppConstants.User.UserStatus.TIMEOUT){
            notificationService.MakeNotificationForUser(user , null , "TIMEOUT" , "You have been timeouted , now you can't make comments and new posts!");
            if(user.getStatus() == dto.getStatus()) {
                dto.setStatus(AppConstants.User.UserStatus.ACTIVE);
                notificationService.MakeNotificationForUser(user , null , "UNTIMEOUT" , "You are now untimeouted");
            }//Untimeout
        }
        user.setStatus(dto.getStatus());
    }

    public void changeUserRole(UserChangesDto dto,Long user_id){
        User user = userRepository.findById(user_id).orElseThrow();
        if(dto.getRole() == null) return;
        user.setRole(dto.getRole());
    }

    public void changeAccountSettings(ChangeAccountSettingsDto dto){
        User u = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(u.getId()).orElseThrow();
        user.setShowTelephone(dto.isShowTelephone());
        user.setShowEmail(dto.isShowEmail());
        userRepository.save(user);
    }

    public void DeleteUser(Long id){
        userRepository.deleteById(id);
    }

    public User AddUser(User user){
        return userRepository.save(user);
    }

    public ResUserDto ReturnLoggedInUserDetails(){
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
        resUserDto.setEmail(user.getEmail(u.getId()));
        resUserDto.setTelephone(user.getTelephone(u.getId()));
        resUserDto.setCreatedAt(user.getCreatedAt());
        resUserDto.setDescription(user.getDescription());


        return resUserDto;
    }
}
