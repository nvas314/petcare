import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { BACKEND_URL } from '../../constants';
import { User } from '../models/user.model';
import { ChangeUserDetails } from '../reqDto/change-user-details.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private PAGE_MAPPING="/users/admin"

  constructor(private http:HttpClient){}

  getAllUsers(){
    return this.http.get<User[]>(BACKEND_URL+this.PAGE_MAPPING+"/all");
  }

  changeUserRole(userId:number,role:string){
    let dto : ChangeUserDetails = new ChangeUserDetails()
    dto.role = role
    return this.http.put<ChangeUserDetails>(BACKEND_URL+"/users/admin/change/role/"+userId,dto)
  }

  changeUserStatus(userId:number,status:string){
    let dto : ChangeUserDetails = new ChangeUserDetails()
    dto.status = status
    return this.http.put<ChangeUserDetails>(BACKEND_URL+"/users/manage/change/status/"+userId,dto)
  }

  deleteUser(userId:number){
    return this.http.delete<ChangeUserDetails>(BACKEND_URL+this.PAGE_MAPPING + "/" + userId)
  }
}
