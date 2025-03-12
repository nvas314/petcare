import { BACKEND_URL } from './../../constants';
import { Account } from './../models/account.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Token } from '@angular/compiler';
import { LoginToken } from '../models/logintoken.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<any>(this.getUserFromStorage());
  user$ = this.userSubject.asObservable();

  constructor(private http:HttpClient,
    private acc:AccountService
  ) { }

  Authenticate(user:User){
    return this.http.post<LoginToken>(BACKEND_URL+"/auth/login",user)
  }

  NewUser(user:User){
    return this.http.post<User>(BACKEND_URL+"/auth/signup",user)
  }

  GiveToken():any{
    return localStorage.getItem('accessToken');
  }

  AccountDetails():any{
      return this.http.get<User>(BACKEND_URL+"account/details")
  }

  Disconect(){
    localStorage.removeItem('accessToken')
    localStorage.removeItem('username')
    localStorage.removeItem('userid')
    localStorage.removeItem('fullname')
    localStorage.removeItem('role')
  }

  SetUserDetails(): Promise<void>{
    return new Promise((resolve)=> {
    this.http.get<User>(BACKEND_URL+"/account/user/details").subscribe((user_data:User) => {
      this.acc.getaccountImage(user_data.id!).subscribe((image_data:string[]) => {
        let image
        if(image_data == null){
          image = "/assets/images/noimageprofile.JPG"
        }
        else{
          image = 'data:image/jpeg;base64,' + image_data[0]
        }
        localStorage.setItem('accimage',image)

        localStorage.setItem('username', user_data.username!);
        let fullname = user_data.name+" "+user_data.middleName+" "+user_data.surname;
        if(user_data.middleName == null){
          fullname = user_data.name+" "+user_data.surname;//No MiddleName
        }
        localStorage.setItem('fullname', fullname);
        localStorage.setItem('userid', user_data.id!.toString());
        localStorage.setItem('role', user_data.role!);

        resolve();
      })
    })
    })
  }

  //For Observable

  shareUserDetails(){
    this.userSubject.next(this.getUserFromStorage());
  }

  getUserFromStorage() {
    return {
      username: localStorage.getItem('username'),
      fullname: localStorage.getItem('fullname'),
      userid: localStorage.getItem('userid'),
      role: localStorage.getItem('role'),
      accimage : localStorage.getItem('accimage'),
    };
  }
}
