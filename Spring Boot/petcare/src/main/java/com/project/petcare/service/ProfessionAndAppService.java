package com.project.petcare.service;

import com.project.petcare.model.ProfApplication;
import com.project.petcare.model.Profession;
import com.project.petcare.model.User;
import com.project.petcare.repository.ProfAppRepository;
import com.project.petcare.repository.ProfRepository;
import com.project.petcare.repository.UserRepository;
import com.project.petcare.request_dto.ApplicationDateDto;
import com.project.petcare.request_dto.ProfAppDto;
import com.project.petcare.response_dto.ResProfAppDto;
import com.project.petcare.response_dto.ResProfDto;
import com.project.petcare.response_dto.ResUserDto;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Validated
public class ProfessionAndAppService {
    ProfRepository profRepository;
    ProfAppRepository profAppRepository;
    UserRepository userRepository;
    UserService userService;
    User userLoggedIn;

    public ProfessionAndAppService(ProfRepository profRepository, ProfAppRepository profAppRepository, UserRepository userRepository, UserService userService) {
        this.profRepository = profRepository;
        this.profAppRepository = profAppRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    public void MakeApplicationRequest(ProfAppDto dto){
        userLoggedIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ProfApplication application = profAppRepository.findByUserId(userLoggedIn.getId());
        if(application == null) {
            application = new ProfApplication();
        }//if not replaces it
        application.setUser(userLoggedIn);
        application.setProfession(dto.getProfession());
        application.setDescription(dto.getDescription());
        application.setLongitude(dto.getLongitude());
        application.setLatitude(dto.getLatitude());
        profAppRepository.save(application);
    }

    public void SetApplicationMeeting(ApplicationDateDto dto){
        ProfApplication application = profAppRepository.findById(dto.getId()).orElseThrow();
        application.setDatetime(dto.getDatetime());
        profAppRepository.save(application);
    }

    public void ApplyApplication(Long id){
        ProfApplication application = profAppRepository.findById(id).orElseThrow();
        User user = userRepository.findById(application.getUser().getId()).orElseThrow();
        Profession profession = profRepository.findByUser(user);
        if(profession == null) {
            profession = new Profession();
            profession.setProfession(application.getProfession());
            profession.setUser(application.getUser());
            profession.setDescription(application.getDescription());
            profession.setLongitude(application.getLongitude());
            profession.setLatitude(application.getLatitude());
        }
        else{
            profession.setProfession(profession.getProfession()+","+application.getProfession());//if not , new application adds up to current one
            profession.setLatitude(application.getLatitude());//If he moved places
            profession.setLongitude(application.getLongitude());
            profession.setDescription(application.getDescription());
        }
        profRepository.save(profession);
        //profAppRepository.delete(application);
        DeleteApplication(application.getId());
    }

    public void ChangeDescription(String description){
        userLoggedIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Profession profession = profRepository.findByUser(userLoggedIn);
        profession.setDescription(description);
        profRepository.save(profession);
    }

    public List<ResProfAppDto> ApplicationsDtos(){
        List<ProfApplication> applications = (List<ProfApplication>) profAppRepository.findAll();
        return applications.stream().map(m ->
                new ResProfAppDto(
                        m.getId(),
                        m.getUser().getId(),
                        m.getDatetime(),
                        m.getProfession(),
                        m.getDescription(),
                        m.getLongitude(),
                        m.getLatitude()
                )
        ).collect(Collectors.toList());
    }

    public List<ResUserDto> ProfessionsDtos(){
        List<User> professionals = userRepository.findAll();
        professionals.removeIf(p -> p.getProfession() == null);
        return professionals.stream().map(p->
                new ResUserDto(
                        p.getId(),
                        p.getName(),
                        p.getSurname(),
                        p.getMiddleName(),
                        p.getProfession().getProfession(),
                        p.getProfession().getId(),
                        p.getProfession().getLongitude(),
                        p.getProfession().getLongitude()
                )
                ).collect(Collectors.toList());
    }

    public void DeleteProf(Long id){
        Profession profession = profRepository.findById(id).orElseThrow();
        profRepository.delete(profession);
    }

    public void DeleteApplication(Long id){
        ProfApplication application = profAppRepository.findById(id).orElseThrow();
        profAppRepository.delete(application);
    }
}
