import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../../constants';
import { GiveReq } from '../models/give-req.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  PAGE_MAPPING = "/notifications"

  constructor(private http:HttpClient) { }

  getNotifications(){
    return this.http.get<Notification[]>(BACKEND_URL+this.PAGE_MAPPING+"/get")
  }

  delNotification(n_id:number){
    console.log(123)
    return this.http.delete<Notification>(BACKEND_URL+this.PAGE_MAPPING+"/delete/"+n_id)
  }

  makeGiveReqs(giveReq:GiveReq){
    return this.http.post<GiveReq>(BACKEND_URL+"/notifications/givereq/send",giveReq)
  }

  getGiveReqs(){
    return this.http.get<GiveReq[]>(BACKEND_URL+"/notifications/givereq/get")
  }

  delGiveReq(id:number){
    return this.http.delete<GiveReq>(BACKEND_URL+"/notifications/givereq/delete/"+id)
  }

  TakePetfromReq(post_id:number,type:string,id:string){//GivePetController
    return this.http.get(BACKEND_URL + "/take/"+ type +"/" + post_id.toString() + "/" + id)
  }
}
