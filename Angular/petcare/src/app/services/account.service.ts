import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BACKEND_URL } from '../../constants';
import { ChangeUserDetails } from '../reqDto/change-user-details.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  PAGE_MAPPING = "/account"

  constructor(private http:HttpClient) { }


  accountDetails(){
    return this.http.get<User>(BACKEND_URL+this.PAGE_MAPPING+"/user/details")
  }

  changeUsernameOrPassword(change:ChangeUserDetails){
    return this.http.put<User>(BACKEND_URL+this.PAGE_MAPPING+"/user/edit",change)
  }

  deleteAccount(){
    return this.http.delete<User>(BACKEND_URL+this.PAGE_MAPPING+"/user/edit")
  }

  addnewImage(formdata:FormData,user_id:number){
    return this.http.post(BACKEND_URL + "/auth/signup/image/select/"+user_id.toString(),formdata)
  }

  getaccountImage(user_id:number){
    return this.http.get<string[]>(BACKEND_URL + "/account/user/image/"+user_id.toString())
  }

  editDetails(cud:ChangeUserDetails){
    return this.http.put<ChangeUserDetails>(BACKEND_URL+this.PAGE_MAPPING+"/user/edit",cud)
  }

  setAccountImage(formdata:FormData){
    return this.http.post(BACKEND_URL + "/account/user/new/image",formdata)
  }

  editUserSettings(changes_dto:any){
    return this.http.put<any>(BACKEND_URL+this.PAGE_MAPPING+"/user/changesettings",changes_dto)
  }
}
