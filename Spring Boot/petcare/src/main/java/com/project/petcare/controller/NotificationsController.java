package com.project.petcare.controller;

import com.project.petcare.request_dto.GiveReqDto;
import com.project.petcare.response_dto.ResGiveReqDto;
import com.project.petcare.response_dto.ResNotificationDto;
import com.project.petcare.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class NotificationsController {
    private final NotificationService notificationService;

    public NotificationsController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/user/get")
    public List<ResNotificationDto> getNotifications(){
        return notificationService.getNotificationsForUser();
    }

    @DeleteMapping("/user/delete/{n_id}")
    public void delNotification(@PathVariable Long n_id){
        notificationService.DeleteNotification(n_id);
    }

    @GetMapping("/user/givereq/get")
    public List<ResGiveReqDto> getOwnGiveReq(){
        return notificationService.getGiveRequests();
    }


    @PostMapping("/user/givereq/send")
    public void getReceivedGiveReq(@RequestBody GiveReqDto dto){
        notificationService.MakeNewSendReq(dto);
    }

    @DeleteMapping("/user/givereq/delete/{n_id}")
    public void declineGiveReq(@PathVariable Long n_id){
        notificationService.DeletePetRequest(n_id);
    }
}
