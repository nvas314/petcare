package com.project.petcare.service;

import com.project.petcare.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@Validated
public class AccountService {

    UserRepository userRepository;

    public AccountService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<String> getAccountImage(){
        List<String> image = new ArrayList<>();
        return image;
    }

    public void setAccountImage(){

    }
}
