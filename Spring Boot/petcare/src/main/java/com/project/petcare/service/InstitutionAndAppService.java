package com.project.petcare.service;

import com.project.petcare.config.AppConstants;
import com.project.petcare.model.*;
import com.project.petcare.repository.InstitutionOfficialsRepository;
import com.project.petcare.repository.InstitutionRepository;
import com.project.petcare.repository.UserRepository;
import com.project.petcare.request_dto.ApplicationDateDto;
import com.project.petcare.request_dto.InstDto;
import com.project.petcare.request_dto.InstOfficialDto;
import com.project.petcare.request_dto.InstOfficialTypeDto;
import com.project.petcare.response_dto.ResInstOfficialAppsDto;
import com.project.petcare.response_dto.ResInstDto;
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
public class InstitutionAndAppService {

    InstitutionRepository institutionRepository;
    InstitutionOfficialsRepository institutionOfficialsRepository;
    UserRepository userRepository;
    UserService userService;
    User userLoggedIn;

    public InstitutionAndAppService(InstitutionRepository institutionRepository, InstitutionOfficialsRepository institutionOfficialsRepository, UserRepository userRepository, UserService userService) {
        this.institutionRepository = institutionRepository;
        this.institutionOfficialsRepository = institutionOfficialsRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    public void AddInstitution(InstDto dto){
        Institution institution = new Institution();
        institution.setName(dto.getName());
        institution.setDescription(dto.getDescription());
        institution.setLongitude(dto.getLongitude());
        institution.setLatitude(dto.getLatitude());
        institutionRepository.save(institution);
    }

    public void MakeApplicationRequest(InstOfficialDto dto){
        userLoggedIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Institution institution = institutionRepository.findById(dto.getInstId()).orElseThrow();
        InstOfficial application;
        application = new InstOfficial();
        application.setInstitution(institution);
        application.setUser(userLoggedIn);
        application.setType(AppConstants.InstOfficial.InstOfficialType.APPLICATION);
        application.setDescription(dto.getDescription());
        institutionOfficialsRepository.save(application);
    }

    public void SetApplicationMeeting(ApplicationDateDto dto){
        InstOfficial application = institutionOfficialsRepository.findById(dto.getId()).orElseThrow();
        application.setDatetime(dto.getDatetime());
        institutionOfficialsRepository.save(application);
    }

    public void ApplyApplication(InstOfficialTypeDto dto){
        InstOfficial application = institutionOfficialsRepository.findById(dto.getId()).orElseThrow();
        if (application.getType()!= AppConstants.InstOfficial.InstOfficialType.APPLICATION){
            return;
        }
        application.setType(dto.getType());
        institutionOfficialsRepository.save(application);
    }

    public void ChangeDescription(String description){
        userLoggedIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        InstOfficial official = institutionOfficialsRepository.findByUserId(userLoggedIn.getId());
        official.setDescription(description);
        institutionOfficialsRepository.save(official);
    }

    public List<ResInstOfficialAppsDto> ApplicationOfficialsDtos(){
        List<InstOfficial> applications;
        applications = institutionOfficialsRepository.findAllApplications();
        return applications.stream().map(m ->
                new ResInstOfficialAppsDto(
                        m.getId(),
                        m.getUser().getId(),
                        m.getInstitution().getId(),
                        m.getInstitution().getName(),
                        m.getDescription(),
                        m.getDatetime(),
                        m.getType()
                )
        ).collect(Collectors.toList());
    }

    public List<ResUserDto> OfficialsDtos(){
        List<User> officials = userRepository.findAll();
        officials.removeIf(o -> o.getInstitutionEmployees().isEmpty());//Only officials in sintitutions
        return officials.stream().map(o ->
                userService.UserToSharedDto(o)).collect(Collectors.toList());
    }

    public List<ResInstDto> InstitutionsDtos(){
        List<Institution> institutions = institutionRepository.findAll();
        return institutions.stream().map(m->
                new ResInstDto(
                        m.getId(),
                        m.getName(),
                        m.getDescription(),
                        m.getLongitude(),
                        m.getLatitude(),
                        m.getOfficials().stream().map(o ->
                                new ResUserDto(
                                        o.getUser().getId(),
                                        o.getUser().getUsername(),
                                        o.getUser().getName(),
                                        o.getUser().getSurname(),
                                        o.getUser().getMiddleName()
                                )).collect(Collectors.toList())
                )).collect(Collectors.toList());
    }

    public void DeleteInst(Long id){
        Institution institution = institutionRepository.findById(id).orElseThrow();
        institutionRepository.delete(institution);
    }

    public void DeleteOfficial(Long id){
        InstOfficial official = institutionOfficialsRepository.findById(id).orElseThrow();
        institutionOfficialsRepository.delete(official);
    }
}
