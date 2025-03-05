import { Announcement } from './../models/announcement.model';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  PAGE_MAPPING = "/announcements"

  constructor(private http:HttpClient) { }

  getAnnouncements(){
    return this.http.get<Announcement[]>(BACKEND_URL+this.PAGE_MAPPING+"/get")
  }

  addAnnouncement(an:Announcement){
    return this.http.post<Announcement>(BACKEND_URL+this.PAGE_MAPPING+"/manage/add",an)
  }

  delAnnouncement(an_id:number){
    return this.http.delete<Announcement>(BACKEND_URL+this.PAGE_MAPPING+"/manage/del/"+an_id)
  }
}
