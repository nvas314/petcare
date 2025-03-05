package com.project.petcare.controller;

import com.project.petcare.request_dto.AnnouncementDto;
import com.project.petcare.response_dto.ResAnnouncementDto;
import com.project.petcare.service.AnnouncementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/announcements")
@CrossOrigin(origins = "*")
public class AnnouncementsController {

    private final AnnouncementService announcementService;

    public AnnouncementsController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @GetMapping("/get")
    public List<ResAnnouncementDto> getAnnouncements(){
        return announcementService.GetAnnouncements();
    }

    @PostMapping("/manage/add")
    public void newAnnouncement(@RequestBody AnnouncementDto dto){
        announcementService.CreateAnnouncement(dto);
    }

    @DeleteMapping("/manage/del/{an_id}")
    public void deleteAnnouncement(@PathVariable Long an_id){
        announcementService.DeleteAnnouncement(an_id);
    }
}
