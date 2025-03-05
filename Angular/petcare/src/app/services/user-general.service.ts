import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCommonView } from '../models/user-details.model';
import { BACKEND_URL } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class UserGeneralService {



  constructor(private http:HttpClient) { }

  ShowUserDetails(id:string){
    return this.http.get<UserCommonView>(BACKEND_URL+"/users/common/"+id)
  }

  SearchUser(string:string){
    return this.http.get<UserCommonView[]>(BACKEND_URL+"/users/common/search/"+string)
  }


  SearchUsersGeneral(){
    return this.http.get<UserCommonView[]>(BACKEND_URL+"/users/admin/all")
  }
}
