package com.project.petcare.service;

import com.project.petcare.config.AppConstants;
import com.project.petcare.model.*;
import com.project.petcare.repository.*;
import com.project.petcare.request_dto.GiveReqDto;
import com.project.petcare.response_dto.ResGiveReqDto;
import com.project.petcare.response_dto.ResNotificationDto;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Validated
public class NotificationService {
    PostRepository postRepository;
    InstitutionRepository institutionRepository;
    UserRepository userRepository;
    GiveReqRepository giveReqRepository;
    NotificationRepository notificationRepository;
    User for_user;

    public NotificationService(PostRepository postRepository, InstitutionRepository institutionRepository, UserRepository userRepository, GiveReqRepository giveReqRepository, NotificationRepository notificationRepository) {
        this.postRepository = postRepository;
        this.institutionRepository = institutionRepository;
        this.userRepository = userRepository;
        this.giveReqRepository = giveReqRepository;
        this.notificationRepository = notificationRepository;
    }

    public List<ResNotificationDto> getNotificationsForUser(){
        for_user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Notification> notifications = notificationRepository.findByUser(for_user);
        return notifications.stream().map(n ->
                new ResNotificationDto(
                        n.getId(),
                        n.getTimestamp(),
                        n.getTitle(),
                        n.getMessage()
                )).collect(Collectors.toList());
    }

    public void MakeNotificationForUser(User user,Post post,String title,String message){
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setPost(post);
        notification.setTitle(title);
        notification.setMessage(message);
        notificationRepository.save(notification);
    }

    public void DeleteNotification(Long n_id){
        Notification notification = notificationRepository.findById(n_id).orElseThrow();
        notificationRepository.delete(notification);
    }

    public void MakeNewSendReq(GiveReqDto dto){
        GiveReq giveReq = new GiveReq();
        Post post = postRepository.findById(dto.getPostid()).orElseThrow();
        if (post.getType() == AppConstants.Post.PostType.LOST) return; //Lost pets cannot be traded
        giveReq.setToholder(dto.getToholder());
        giveReq.setToanimalHolderId(dto.getToanimalHolderId());
        giveReq.setPost(post);
        giveReqRepository.save(giveReq);
    }

    public List<ResGiveReqDto> getGiveRequests(){
        User to_user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Profession prof = to_user.getProfession();
        List<Institution> inst = to_user.getInstitutionEmployees()
                .stream().map(InstOfficial::getInstitution).toList();
        List<GiveReq> giveReqs = new java.util.ArrayList<>();
        giveReqs.addAll(giveReqRepository.findByToanimalHolderIdAndToholder(to_user.getId(), AppConstants.Post.AnimalHolder.COMMON));
        if(prof != null){
            giveReqs.addAll(giveReqRepository.findByToanimalHolderIdAndToholder(prof.getId(), AppConstants.Post.AnimalHolder.VET));
        }
        inst.forEach(institution -> {
           giveReqs.addAll(giveReqRepository.findByToanimalHolderIdAndToholder(institution.getId(), AppConstants.Post.AnimalHolder.INSTITUTION));
        });
        return ReqsToDto(giveReqs);
    }

    private List<ResGiveReqDto> ReqsToDto(List<GiveReq> reqs){
        return reqs.stream().map(r ->
                new ResGiveReqDto(
                        r.getId(),
                        r.getPost().getId(),
                        r.getToholder(),
                        r.getToanimalHolderId()
                )).collect(Collectors.toList());
    }

    public void DeletePetRequest(Long reqid){
        GiveReq giveReq = giveReqRepository.findById(reqid).orElseThrow();
        giveReqRepository.delete(giveReq);
    }
}
