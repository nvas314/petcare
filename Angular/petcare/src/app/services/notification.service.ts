import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../../constants';
import { GiveReq } from '../models/give-req.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationsSubject = new BehaviorSubject<number>(0);
  giveReqsSubject = new BehaviorSubject<number>(0);

  notifications$ = this.notificationsSubject.asObservable();
  giveReqs$ = this.giveReqsSubject.asObservable();

  PAGE_MAPPING = "/notifications"

  constructor(private http:HttpClient) { }

  getNotifications(){
    return this.http.get<Notification[]>(BACKEND_URL+this.PAGE_MAPPING+"/user/get")
  }

  delNotification(n_id:number){
    return this.http.delete<Notification>(BACKEND_URL+this.PAGE_MAPPING+"/user/delete/"+n_id)
  }

  makeGiveReqs(giveReq:GiveReq){
    return this.http.post<GiveReq>(BACKEND_URL+"/notificationsuser/givereq/send",giveReq)
  }

  getGiveReqs(){
    return this.http.get<GiveReq[]>(BACKEND_URL+"/notifications/user/givereq/get")
  }

  delGiveReq(id:number){
    return this.http.delete<GiveReq>(BACKEND_URL+"/notifications/user/givereq/delete/"+id)
  }

  TakePetfromReq(post_id:number,type:string,id:string){//GivePetController
    return this.http.get(BACKEND_URL + "/take/user/"+ type +"/" + post_id.toString() + "/" + id)
  }


  loadNotifications() {
    this.getNotifications().subscribe((data) => {
      this.notificationsSubject.next(data.length);
    });
  }

  loadGiveReqs() {
    this.getGiveReqs().subscribe((data) => {
      this.giveReqsSubject.next(data.length);
    });
  }
}
