import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { BACKEND_URL } from '../../constants';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private PAGE_MAPPING="/users/admin"

  constructor(private http:HttpClient){}

  getAllUsers(){
    return this.http.get<User[]>(BACKEND_URL+this.PAGE_MAPPING+"/all");
  }

  changeUserType(userId:number,type:string){

  }

  changeUserStatus(userId:number,status:string){

  }
}
