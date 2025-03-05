package com.project.petcare.service;

import com.project.petcare.model.Announcement;
import com.project.petcare.model.Post;
import com.project.petcare.repository.AnnouncementRepository;
import com.project.petcare.repository.PostRepository;
import com.project.petcare.request_dto.AnnouncementDto;
import com.project.petcare.response_dto.ResAnnouncementDto;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Validated
public class AnnouncementService {

    AnnouncementRepository announcementRepository;
    PostRepository postRepository;

    public AnnouncementService(PostRepository postRepository, AnnouncementRepository announcementRepository) {
        this.postRepository = postRepository;
        this.announcementRepository = announcementRepository;
    }

    public void CreateAnnouncement(AnnouncementDto dto){
        if(dto.getMessage() == null || dto.getTitle() == null) return;//Missing values
        Post post;
        Announcement announcement = new Announcement();
        if(dto.getPostId() != null) {//You can make an announcement without a referring post
            post = postRepository.findById(dto.getPostId()).orElseThrow();
            announcement.setPost(post);
        }
        if(dto.getDate() != null){
            announcement.setDate(dto.getDate());
        }
        else{
            announcement.setDate(new Date());
        }
        announcement.setTitle(dto.getTitle());
        announcement.setMessage(dto.getMessage());
        announcementRepository.save(announcement);
    }

    public List<ResAnnouncementDto> GetAnnouncements(){
        List<Announcement> announcements = announcementRepository.findAll();
        return announcements.stream().map(a ->
                new ResAnnouncementDto(
                        a.getId(),
                        a.getTitle(),
                        a.getMessage(),
                        a.getDate(),
                        Optional.ofNullable(a.getPost()).map(Post::getId).orElse(null) //If Post is null, reutrn null
                )).collect(Collectors.toList());
    }

    public void DeleteAnnouncement(Long an_id){
        Announcement announcement = announcementRepository.findById(an_id).orElseThrow();
        announcementRepository.delete(announcement);
    }
}
