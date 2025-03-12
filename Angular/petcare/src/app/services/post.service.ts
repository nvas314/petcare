import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { PostComment } from '../models/post-comment.model';
import { BACKEND_URL } from '../../constants';
import { GiveReq } from '../models/give-req.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {



  constructor(private http:HttpClient) {}

  getLostPosts(){
    return this.http.get<Post[]>(BACKEND_URL + "/posts/lost")
  }

  getFoundPosts(){
    return this.http.get<Post[]>(BACKEND_URL + "/posts/found")
  }

  getOwnPosts(){
    return this.http.get<Post[]>(BACKEND_URL + "/posts/user/own")
  }

  addPost(post:any){
    return this.http.post<Post>(BACKEND_URL + "/posts/user/new",post)
  }

  getPost(id:string){
    return this.http.get<Post>(BACKEND_URL+"/posts/" + id);
  }

  getImages(post_id:number){
    return this.http.get<string[]>(BACKEND_URL + "/posts/images/"+post_id.toString())
  }

  givePetReq(giveReq:GiveReq){
    return this.http.post<GiveReq>(BACKEND_URL + "/notifications/user/givereq/send",giveReq)
  }

  setOwnPostStatus(post_id:number,status:string){
    return this.http.get<Post>(BACKEND_URL + "/posts/user/set/"+post_id+"/"+status)
  }

  delPost(id:number){
    return this.http.delete<Post>(BACKEND_URL + "/posts/manage/"+id)
  }
}
