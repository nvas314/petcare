import { ChangeDetectorRef, Component } from '@angular/core';
import { InstitutionService } from '../../services/institution.service';
import { Institution } from '../../models/institution.model';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InstEmpl } from '../../models/inst-empl.model';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatList, MatListItem } from '@angular/material/list';
import { MapOutputComponent } from "../misc/map-output/map-output.component";
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-institutions',
  imports: [NgFor, RouterModule, NgIf,
    MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle, MatCardSubtitle, MatButton, MatButtonModule, MatList, MatListItem, MapOutputComponent],
  templateUrl: './institutions.component.html',
  styleUrl: './institutions.component.css'
})
export class InstitutionsComponent {

  intitutions:Institution[] = []
  isroleAdmin = false

  institution_selected = -1;
  p:Post[] = []

  selectInstitution(id:number){
    this.institution_selected = this.intitutions.findIndex(x => x.id == id);
  }

  constructor(private serv:InstitutionService,
    private postserv:PostService,
    private cdr:ChangeDetectorRef
  ){
    if(localStorage.getItem('username')){
      this.getPostFound();
    }
    this.fetch();
    if(localStorage.getItem('role') == "ADMIN"){
      this.isroleAdmin = true
    }
  }

  fetch(){
    this.intitutions = []
    this.serv.getAllInsts().subscribe((data:Institution[]) =>{
      this.intitutions=data
      this.cdr.detectChanges()
    })
  }

  getPostFound(){
    this.postserv.getOwnPosts().subscribe((data:Post[]) =>{
      data.forEach(d=>{
        if(d.type == "FOUND" && d.status != "RETURNED"){
          this.p.push(d);
        }
      })
    })
  }

  Delete(institution_id:number){
    this.serv.delInst(institution_id).subscribe((data)=>{
      this.fetch()
    })
  }
}
