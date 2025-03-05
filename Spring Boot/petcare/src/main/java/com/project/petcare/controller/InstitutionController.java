package com.project.petcare.controller;

import com.project.petcare.request_dto.*;
import com.project.petcare.response_dto.ResInstOfficialAppsDto;
import com.project.petcare.response_dto.ResInstDto;
import com.project.petcare.response_dto.ResUserDto;
import com.project.petcare.service.InstitutionAndAppService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/institutions")
@CrossOrigin(origins = "*")
public class InstitutionController {

    private final InstitutionAndAppService institutionAndAppService;

    public InstitutionController(InstitutionAndAppService institutionAndAppService) {
        this.institutionAndAppService = institutionAndAppService;
    }

    @GetMapping("/all")
    public List<ResInstDto> getAllInsts(){
        return institutionAndAppService.InstitutionsDtos();
    }

    @PostMapping("/admin/new")
    public void NewInstitution(@RequestBody InstDto dto){
        //if(dto.getLongitude() < 34 || dto.getLongitude() > 42 || dto.getLatitude() < 18 || dto.getLatitude() > 30) return;//Not in Greece
        institutionAndAppService.AddInstitution(dto);
    }

    @GetMapping("/apps/all")
    public List<ResInstOfficialAppsDto> getAllInstApps(){
        return institutionAndAppService.ApplicationOfficialsDtos();
    }


    @PutMapping("/apps/apply")
    public void ApplyUserApplication(@RequestBody InstOfficialTypeDto dto){
        institutionAndAppService.ApplyApplication(dto);
    }

    @PostMapping("/app/new")
    public void NewApplication(@RequestBody InstOfficialDto dto){
        institutionAndAppService.MakeApplicationRequest(dto);
    }

    @PutMapping("/app/new/meeting")
    public void NewMeeting(@RequestBody ApplicationDateDto dto){
        institutionAndAppService.SetApplicationMeeting(dto);
    }

    @GetMapping("/officials/all")
    public List<ResUserDto> getAllInstOfficials(){
        return institutionAndAppService.OfficialsDtos();
    }

    @PutMapping("/edit")
    public void ChangeOfficialDescription(@RequestBody ChangeDescriptionDto dto){
        if(dto.getDescription() == null) return; //Missing values
        institutionAndAppService.ChangeDescription(dto.getDescription());
    }

    @DeleteMapping("/{id}")
    public void DeleteInst(@PathVariable Long id){
        institutionAndAppService.DeleteInst(id);
    }

    @DeleteMapping("/apps/{id}")
    public void DeleteInstApplication(@PathVariable Long id){
        institutionAndAppService.DeleteOfficial(id);
    }
}
