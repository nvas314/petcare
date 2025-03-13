import { ChangeDetectorRef, Component } from '@angular/core';
import { Profession } from '../../models/profession.model';
import { ProfessionService } from '../../services/profession.service';
import { NgFor, NgIf } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle, MatCardSubtitle } from '@angular/material/card';
import { MatList, MatListItem, MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstEmpl } from '../../models/inst-empl.model';
import { InstitutionService } from '../../services/institution.service';
import { MapOutputComponent } from "../misc/map-output/map-output.component";
import { UserCommonView } from '../../models/user-details.model';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { RouterModule } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-professions',
  imports: [NgFor, FormsModule, ReactiveFormsModule, NgIf,RouterModule,
    MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle, MatCardSubtitle, MatButton, MatButtonModule, MatList, MatListItem, MatTab, MatTabGroup, MatSelectionList, MatListOption, MapOutputComponent],
  templateUrl: './professions.component.html',
  styleUrl: './professions.component.css'
})
export class ProfessionsComponent {

  acccountImages = new Map()

  professionals:UserCommonView[] = []
  inst_employees:UserCommonView[] = []
  p:Post[] = []
  constructor(private profServ:ProfessionService,
    private instServ:InstitutionService,
    private postserv:PostService,
    private cdr:ChangeDetectorRef,
    private acc:AccountService
  ){
    if(localStorage.getItem('username')){
    postserv.getOwnPosts().subscribe((data:Post[]) =>{
      data.forEach(d=>{
        if(d.type == "FOUND" && d.status != "RETURNED"){
          this.p.push(d);
        }
      })
    })
    }
    this.fetchdata();
  }

  fetchdata(){
    this.profServ.getAllProfs().subscribe((data:UserCommonView[]) =>{
      this.professionals=data
    })
    this.instServ.getAllInstEmpls().subscribe((data:UserCommonView[]) =>{
      this.inst_employees=data

      this.getInstEmplImages()
    })
  }

    inst_select = new FormGroup({
    select : new FormControl(),
    })

    prof_select = new FormGroup({
      select : new FormControl(),
    })

  showEmpl(){
    if(this.inst_select.controls.select.value != null){
      return this.inst_employees[this.inst_employees.findIndex(x => x.id == this.inst_select.controls.select.value)]
    }
    else{
      return null
    }
  }

  getFullname(){
    let fullname = this.showEmpl()?.name + " " + this.showEmpl()?.middleName + " " + this.showEmpl()?.surname
    fullname = fullname.replace("  "," ") //Remove MiddleName
    return fullname;
  }

  getFullnameByUser(user:UserCommonView){
    let fullname = user.name + " " + user?.middleName + " " + user.surname
    fullname = fullname.replace("  "," ") //Remove MiddleName
    return fullname;
  }

  getInstEmplImages(){
    this.inst_employees!.forEach(acc => {
      this.acc.getaccountImage(acc.id!).subscribe((data) => {
      if(data != null){
        this.acccountImages.set(acc.id!,'data:image/jpeg;base64,' + data[0])
      }
      this.cdr.detectChanges();
      }
      )
    });
    this.acccountImages.set(parseInt(localStorage.getItem('userid')!),localStorage.getItem('accimage'))
  }

  showProf(){
    if(this.prof_select.controls.select.value != null){
      return this.professionals[this.professionals.findIndex(x => x.id == this.prof_select.controls.select.value)]
    }
    else{
      return null
    }
  }

    onSelectionChangeProf(event: MatSelectionListChange) {
      this.inst_select.reset()
    }
    onSelectionChangeInst(event: MatSelectionListChange) {
      this.prof_select.reset()
    }
}
