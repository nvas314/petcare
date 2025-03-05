import { BACKEND_URL } from './../../constants';
import { Account } from './../models/account.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Token } from '@angular/compiler';
import { LoginToken } from '../models/logintoken.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }



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

  SetUserDetails(){
    this.http.get<User>(BACKEND_URL+"/account/details").subscribe((data:User) => {
      localStorage.setItem('username', data.username!);
      localStorage.setItem('fullname', data.name+" "+data.middleName+" "+data.surname);
      localStorage.setItem('userid', data.id!.toString());
      localStorage.setItem('role', data.role!);
    })
  }
}
