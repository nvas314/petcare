import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnnouncementService } from '../../services/announcement.service';
import { Announcement } from '../../models/announcement.model';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-announcements',
  imports: [RouterModule,NgFor,NgIf,DatePipe,
    MatList,MatListItem,MatDivider,MatButton,MatButtonModule
  ],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.css'
})
export class AnnouncementsComponent {

  an:Announcement[] = []
  hasManagerPrivs = false //Only managers and up can delete announcements

  constructor(private serv:AnnouncementService){
    if((localStorage.getItem('role') == "MANGAGER") || (localStorage.getItem('role') == "APPROVER") || (localStorage.getItem('role') == "ADMIN")){
      this.hasManagerPrivs = true
    }
    this.fetch()
  }


  fetch(){
    this.an = []
    this.serv.getAnnouncements().subscribe((data:Announcement[]) =>{
      this.an = data
          })
  }

  DeleteAn(id:number){
    this.serv.delAnnouncement(id).subscribe((data)=>{
      this.fetch()
    })
  }
}
