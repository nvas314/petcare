package com.project.petcare.service;

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
    String imagePath;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }

    public ResUserDto UserToSharedDto(User user){
        ResUserDto shUserDto = new ResUserDto();
        shUserDto.setId(user.getId());
        shUserDto.setUsername(user.getUsername());
        shUserDto.setName(user.getName());
        shUserDto.setSurname(user.getSurname());
        shUserDto.setMiddleName(user.getMiddleName());
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
            if(name.matches(dto.getName()+" "+dto.getMiddleName()+" "+ dto.getSurname())){
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
        String Path = "C:\\data\\account\\"+userId+"\\image";
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
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String Path = imagePath +"/"+user.getId()+"/";
        new File(Path).mkdirs();
        System.gc();
        Thread.sleep(100); //ensure the file is not locked before deleted
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
        if(dto.getPassword() != null){
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }
        userRepository.save(user);
    }

    public void changeUserStatus(UserChangesDto dto,Long user_id){
        User user = userRepository.findById(user_id).orElseThrow();
        if(dto.getStatus() == null) return;
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
}
