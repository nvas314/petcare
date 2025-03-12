import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profession } from '../models/profession.model';
import { BACKEND_URL } from '../../constants';
import { ProfApp } from '../models/prof-app.model';
import { ChangeDescriptionDto } from '../reqDto/change-description-dto.model';
import { ApplicationDateDto } from '../reqDto/application-date-dto.model';
import { UserCommonView } from '../models/user-details.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessionService {

  PAGE_MAPPING = "/profs"

  constructor(private http:HttpClient) { }

  getAllProfs(){
    return this.http.get<UserCommonView[]>(BACKEND_URL+this.PAGE_MAPPING+"/all")
  }

  getAllProfApps(){
    return this.http.get<ProfApp[]>(BACKEND_URL+this.PAGE_MAPPING+"/approve/apps/all")
  }

  applyUserProfApp(user_id:number){
    return this.http.get<ProfApp>(BACKEND_URL+this.PAGE_MAPPING+"/approve/apps/apply/"+user_id)
  }

  makeApplication(app:ProfApp){
    return this.http.post<ProfApp>(BACKEND_URL+this.PAGE_MAPPING+"/user/app/new",app)
  }

  scheduleMeeting(appd:ApplicationDateDto){
    return this.http.put<Profession>(BACKEND_URL+this.PAGE_MAPPING+"/approve/app/new/meeting",appd)
  }

  editProf(chDesc:ChangeDescriptionDto){
    return this.http.put<Profession>(BACKEND_URL+this.PAGE_MAPPING+"/user/edit",chDesc)
  }

  delProf(p_id:number){
    return this.http.delete<Profession>(BACKEND_URL+this.PAGE_MAPPING+"/user/"+p_id)
  }

  delProfApp(p_id:number){
    return this.http.delete<ProfApp>(BACKEND_URL+this.PAGE_MAPPING+"/approve/apps/"+p_id)
  }
}
