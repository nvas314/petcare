package com.project.petcare.controller;

import com.project.petcare.request_dto.ApplicationDateDto;
import com.project.petcare.request_dto.ProfAppDto;
import com.project.petcare.request_dto.ChangeDescriptionDto;
import com.project.petcare.response_dto.ResProfAppDto;
import com.project.petcare.response_dto.ResProfDto;
import com.project.petcare.response_dto.ResUserDto;
import com.project.petcare.service.ProfessionAndAppService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profs")
@CrossOrigin(origins = "*")
public class ProfessionController {

    private final ProfessionAndAppService professionAndAppService;

    public ProfessionController(ProfessionAndAppService professionAndAppService) {
        this.professionAndAppService = professionAndAppService;
    }

    @GetMapping("/all")
    public List<ResUserDto> getAllProfs(){
        return  professionAndAppService.ProfessionsDtos();
    }

    @GetMapping("/apps/all")
    public List<ResProfAppDto> getAllProfApps(){
        return professionAndAppService.ApplicationsDtos();
    }

    @GetMapping("/apps/apply/{id}")
    public void ApplyUserApplication(@PathVariable Long id){
        professionAndAppService.ApplyApplication(id);
    }

    @PostMapping("/app/new")
    public void NewApplication(@RequestBody ProfAppDto dto){
        professionAndAppService.MakeApplicationRequest(dto);
    }

    @PutMapping("/app/new/meeting")
    public void NewMeeting(@RequestBody ApplicationDateDto dto){
        professionAndAppService.SetApplicationMeeting(dto);
    }

    @PutMapping("/edit")
    public void ChangeProfessionDescription(@RequestBody ChangeDescriptionDto dto){
        professionAndAppService.ChangeDescription(dto.getDescription());
    }

    @DeleteMapping("/{p_id}")
    public void DeleteProf(@PathVariable Long p_id){
        professionAndAppService.DeleteProf(p_id);
    }

    @DeleteMapping("/apps/{p_id}")
    public void DeleteProfApplication(@PathVariable Long p_id){
        professionAndAppService.DeleteApplication(p_id);
    }
}
