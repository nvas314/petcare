import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostComment } from '../models/post-comment.model';
import { Post } from '../models/post.model';
import { BACKEND_URL } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class CommentService {



  constructor(private http:HttpClient) { }

  getComments(post_id:string){
    return this.http.get<PostComment[]>(BACKEND_URL+"/comments/" + post_id);
  }

  addComments(post_id:string , comment:PostComment){
    return this.http.post<PostComment>(BACKEND_URL+"/comments/" + post_id,comment);
  }

  deleteComment(comment_id:string){
    return this.http.delete<PostComment>(BACKEND_URL+"/comments/"+comment_id)
  }
}
