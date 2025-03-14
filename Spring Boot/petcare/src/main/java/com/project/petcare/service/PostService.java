package com.project.petcare.service;

import com.project.petcare.config.AppConstants;
import com.project.petcare.model.*;
import com.project.petcare.repository.*;
import com.project.petcare.request_dto.PostDto;
import com.project.petcare.response_dto.ResPostDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
@Validated
public class PostService {
    @Value("${file.image.path.post}")
    String imagePath;
    UserRepository userRepository;
    PostRepository postRepository;
    InstitutionRepository institutionRepository;
    InstitutionOfficialsRepository institutionOfficialsRepository;
    ProfRepository profRepository;
    NotificationService notificationService;

    public PostService(UserRepository userRepository, PostRepository postRepository, InstitutionRepository institutionRepository, InstitutionOfficialsRepository institutionOfficialsRepository, ProfRepository profRepository, NotificationService notificationService) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.institutionRepository = institutionRepository;
        this.institutionOfficialsRepository = institutionOfficialsRepository;
        this.profRepository = profRepository;
        this.notificationService = notificationService;
    }

    public void createPost(PostDto postDto, List<MultipartFile> mpf) throws IOException {
        User fromuser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        fromuser = userRepository.findById(fromuser.getId()).orElseThrow();
        if(fromuser.getStatus() == AppConstants.User.UserStatus.TIMEOUT) return;//Timedout users cannot make posts
        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setLatitude(postDto.getLatitude());
        post.setLongitude(postDto.getLongitude());
        post.setAnimal(postDto.getAnimal());
        post.setBreed(postDto.getBreed());
        post.setType(postDto.getType());
        post.setTimestamp(postDto.getTimestamp());
        post.setStatus(postDto.getStatus());
        post.setCollarText(postDto.getCollarText());
        post.setDescription(postDto.getDescription());
        post.setHealthCondition(postDto.getHealthCondition());
        post.setHolder(postDto.getHolder());


        if(post.getHolder() == AppConstants.Post.AnimalHolder.COMMON){
            post.setAnimalHolderId(fromuser.getId());
        }
        else if ((post.getHolder() == AppConstants.Post.AnimalHolder.VET)) {
            Profession prof = profRepository.findByUser(fromuser);
            if(prof == null)return;
            post.setAnimalHolderId(prof.getId());
        }
        else {
            Institution inst = institutionRepository.findByName(postDto.getInstName());
            InstOfficial instOfficial = institutionOfficialsRepository.findByUser(fromuser);
            if(!inst.getOfficials().contains(instOfficial) || inst == null)return;//If he is not in the institution
            post.setAnimalHolderId(inst.getId());
        }


        post.setUser(fromuser);
        if (postDto.getTimestamp() != null){
            post.setTimestamp(postDto.getTimestamp());
        }
        else{
            post.setTimestamp(new Timestamp(System.currentTimeMillis()));
        }

        Post savedPost = postRepository.save(post);

        int mpfCount = 0;
        for(MultipartFile mpfile : mpf){
            mpfCount += 1;
            String PathFolder = "/" + savedPost.getId() +"/";
            new File(imagePath+PathFolder).mkdirs();
            mpfile.transferTo(new File(imagePath+PathFolder+ Integer.toString(mpfCount)));
        }

        if(post.getStatus() == AppConstants.Post.PostStatus.EMERGENCY && post.getType() == AppConstants.Post.PostType.FOUND){
            List<Profession> professionals = (List<Profession>) profRepository.findAll();
            professionals.forEach(professional ->
                    notificationService.MakeNotificationForUser(professional.getUser(),post,"EMERGENCY","There is a pet needing your help!")
            );//Send to all the professionals
        }
    }


    public List<ResPostDto> FindLostPosts(){
        List<Post> postsRepo = postRepository.findByType(AppConstants.Post.PostType.LOST);
        return PostToResDtoList(postsRepo);
    }

    public List<ResPostDto> FindFoundPosts(){
        List<Post> postsRepo = postRepository.findByType(AppConstants.Post.PostType.FOUND);
        return PostToResDtoList(postsRepo);
    }

    public List<ResPostDto> PostToResDtoList(List<Post> posts){
        List<ResPostDto> reslist = new ArrayList<>();
        for(Post post : posts){
            reslist.add(PostToResDto(post));
        }
        return reslist;
    }

    public ResPostDto PostToResDto(Post post){
        ResPostDto resPostDto = new ResPostDto();
        resPostDto.setId(post.getId());
        resPostDto.setTitle(post.getTitle());
        resPostDto.setAnimalName(post.getAnimalName());
        resPostDto.setDescription(post.getDescription());
        resPostDto.setAnimal(post.getAnimal());
        resPostDto.setTimestamp(post.getTimestamp());
        resPostDto.setLatitude(post.getLatitude());
        resPostDto.setLongitude(post.getLongitude());
        resPostDto.setCollarText(post.getCollarText());
        resPostDto.setBreed(post.getBreed());
        resPostDto.setHealthCondition(post.getHealthCondition());
        resPostDto.setStatus(post.getStatus());
        resPostDto.setHolder(post.getHolder());
        resPostDto.setAnimalHolderId(post.getAnimalHolderId());
        resPostDto.setType(post.getType());


        if(resPostDto.getHolder() == AppConstants.Post.AnimalHolder.COMMON){
            User user_holder = userRepository.findById(post.getAnimalHolderId()).orElseThrow();
            resPostDto.setUsername(user_holder.getUsername());
            resPostDto.setName(user_holder.getName());
            resPostDto.setSurname(user_holder.getSurname());
            resPostDto.setMiddleName(user_holder.getMiddleName());
        } else if (resPostDto.getHolder() == AppConstants.Post.AnimalHolder.VET) {
            Profession prof_holder = profRepository.findById(post.getAnimalHolderId()).orElseThrow();
            User user_holder = prof_holder.getUser();
            resPostDto.setProfession(prof_holder.getProfession());
            resPostDto.setUsername(user_holder.getUsername());
            resPostDto.setName(user_holder.getName());
            resPostDto.setSurname(user_holder.getSurname());
            resPostDto.setMiddleName(user_holder.getMiddleName());
        }else {
            resPostDto.setInstName(institutionRepository.findById(resPostDto.getAnimalHolderId()).orElseThrow().getName());
        }

        return resPostDto;
    }
    public List<String> getAllImages(String post_id) throws IOException {
        InputStream is;
        List<byte[]> images = new ArrayList<>();
        String Path = "C:\\data\\post\\"+post_id+"\\";
        for (int i = 1; i <= 5; i++) {
            File file = new File(Path+i);
            if (!file.exists()) break;
            try {
                is = new FileInputStream(Path+i);
                images.add(is.readAllBytes());
            } catch (FileNotFoundException ignored) {
            }

        }
        List<String> base64images = new ArrayList<>();
        for(byte[] image : images){
            base64images.add(Base64.getEncoder().encodeToString(image));
        }
        return base64images;
    }

    public List<ResPostDto> ShowOwnPosts(){
        User fromuser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Post> posts;
        posts = postRepository.findByAnimalHolderIdAndHolder(fromuser.getId(), AppConstants.Post.AnimalHolder.COMMON);//User Posts
        List<Post> finalPosts = new ArrayList<>();
        if(fromuser.getProfession() != null){
            finalPosts.addAll(postRepository.findByAnimalHolderIdAndHolder(fromuser.getProfession().getId(), AppConstants.Post.AnimalHolder.VET));
        }
        fromuser.getInstitutionEmployees().forEach(instOfficial ->
                finalPosts.addAll(postRepository.findByAnimalHolderIdAndHolder(instOfficial.getInstitution().getId(), AppConstants.Post.AnimalHolder.INSTITUTION)));
        posts.addAll(finalPosts);
        return PostToResDtoList(posts);
    }

    public void takePet(Long post_id, Long to_id , String type){
        Post post = postRepository.findById(post_id).orElseThrow();
        if (post.getType() == AppConstants.Post.PostType.LOST) return; // Lost animals cannot be traded
        post.setAnimalHolderId(to_id);
        switch (type) {
            case "u" -> {
                post.setHolder(AppConstants.Post.AnimalHolder.COMMON);
            }
            case "p" -> {
                post.setHolder(AppConstants.Post.AnimalHolder.VET);
            }
            case "i" -> {
                post.setHolder(AppConstants.Post.AnimalHolder.INSTITUTION);
            }
            case null, default -> {
                return;
            }
        }
        postRepository.save(post);
    }

    public void setPostStatus(Long post_id , String post_status){
        AppConstants.Post.PostStatus status;
        User fromuser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        switch (post_status) {
            case "emergency" -> status = AppConstants.Post.PostStatus.EMERGENCY;
            case "returned" -> status = AppConstants.Post.PostStatus.RETURNED;
            case "missing" -> status = AppConstants.Post.PostStatus.MISSING;
            case null, default -> {
                return;
            }
        }
        Post post = postRepository.findById(post_id).orElseThrow();
        //if(!Objects.equals(post.getUser().getId(), fromuser.getId())) return; //Only post owner can change the status
        post.setStatus(status);
        postRepository.save(post);
    }

    public ResPostDto FindPost(Long id){
        Post post = postRepository.findById(id).orElseThrow();
        return PostToResDto(post);
    }

    public void DeletePost(Long id){
        postRepository.deleteById(id);
    }
}
