import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnnouncementService } from '../../services/announcement.service';
import { Announcement } from '../../models/announcement.model';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-announcements',
  imports: [RouterModule,NgFor,NgIf,DatePipe,
    MatList,MatListItem,MatDivider
  ],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.css'
})
export class AnnouncementsComponent {

  an:Announcement[] = []

  constructor(private serv:AnnouncementService){
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
