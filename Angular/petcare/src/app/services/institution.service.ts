import { InstOfficialTypeDto } from './../reqDto/inst-official-type-dto.model';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Institution } from '../models/institution.model';
import { BACKEND_URL } from '../../constants';
import { InstEmpl } from '../models/inst-empl.model';
import { ApplicationDateDto } from '../reqDto/application-date-dto.model';
import { ChangeDescriptionDto } from '../reqDto/change-description-dto.model';
import { UserCommonView } from '../models/user-details.model';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  PAGE_MAPPING = "/institutions"

  constructor(private http:HttpClient) { }

  getAllInsts(){
    return this.http.get<Institution[]>(BACKEND_URL+this.PAGE_MAPPING+"/all")
  }

  AddInstitution(inst:Institution){
    return this.http.post<Institution>(BACKEND_URL+this.PAGE_MAPPING+"/admin/new",inst)
  }

  getAllInstEmpls(){
    return this.http.get<UserCommonView[]>(BACKEND_URL+this.PAGE_MAPPING+"/user/officials/all")
  }

  getAllInstApps(){
    return this.http.get<InstEmpl[]>(BACKEND_URL+this.PAGE_MAPPING+"/approve/apps/all")
  }

  applyUserInstEmpl(dto:InstOfficialTypeDto){
    return this.http.put<InstEmpl>(BACKEND_URL+this.PAGE_MAPPING+"/approve/apps/apply",dto)
  }

  makeApplication(app:InstEmpl){
    return this.http.post<InstEmpl>(BACKEND_URL+this.PAGE_MAPPING+"/app/new",app)
  }

  scheduleMeeting(appd:ApplicationDateDto){
    return this.http.put<Institution>(BACKEND_URL+this.PAGE_MAPPING+"/approve/app/new/meeting",appd)
  }

  editInstEmplDesc(chDesc:ChangeDescriptionDto){
    return this.http.put<Institution>(BACKEND_URL+this.PAGE_MAPPING+"/user/edit",chDesc)
  }

  delInst(p_id:number){
    return this.http.delete<Institution>(BACKEND_URL+this.PAGE_MAPPING+"/admin/"+p_id)
  }

  delInstEmpl(p_id:number){
    return this.http.delete<InstEmpl>(BACKEND_URL+this.PAGE_MAPPING+"/approve/apps/"+p_id)
  }
}
