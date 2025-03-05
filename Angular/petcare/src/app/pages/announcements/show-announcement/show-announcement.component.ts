import { Component } from '@angular/core';
import { Announcement } from '../../../models/announcement.model';
import { AnnouncementService } from '../../../services/announcement.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-show-announcement',
  imports: [RouterModule,NgIf,DatePipe],
  templateUrl: './show-announcement.component.html',
  styleUrl: './show-announcement.component.css'
})
export class ShowAnnouncementComponent {

  an:Announcement[] = []
  anmnt?:Announcement

  constructor(private serv:AnnouncementService,
    private actroute:ActivatedRoute
  ){
    this.fetch()
  }


  fetch(){
    this.an = []
    this.serv.getAnnouncements().subscribe((data:Announcement[]) =>{
      this.an = data
      data.forEach(an => {
        if(an.id?.toString() == this.actroute.snapshot.paramMap.get('id')!){
          this.anmnt = an
        }
      });
    })
  }

}
