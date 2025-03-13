import { ChangeDetectorRef, Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { UserNotification } from '../../models/user-notification.model';
import { RouterModule } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GiveReq } from '../../models/give-req.model';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-notifications',
  imports: [RouterModule,NgIf,NgFor,DatePipe,
    MatCard,MatCardContent,MatIcon,MatButtonModule
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  notif:UserNotification[] = []
  reqs:GiveReq[] = []
  p:Post[] = []
  reqTitles = new Map();

  constructor(private serv:NotificationService,
    private post_serv:PostService,
    private cdr:ChangeDetectorRef
  ){
    this.fetch()
  }


  fetch(){
    this.serv.getNotifications().subscribe((data:UserNotification[]) =>{
      this.notif = data
    })

    this.post_serv.getFoundPosts().subscribe((data:Post[]) => {
      this.p = data
    })
    this.serv.getGiveReqs().subscribe((data:GiveReq[]) =>{
      this.reqs = data
      data.forEach(element => {
        this.reqTitles.set(element.postid,this.ShowReqTitle(element.postid!))
      });
      this.cdr.detectChanges();
    })

  }

  DeleteNotif(id:number){
    this.serv.delNotification(id).subscribe((data)=>{
      this.fetch()
    })
  }

  TakePetReq(post_id:number,type:string,id:string,req_id:number){
    this.serv.TakePetfromReq(post_id,type.toLocaleLowerCase(),id).subscribe(() => {
      this.DelPetReq(req_id);
      this.fetch();
    })
  }

  DelPetReq(req_id:number){
    this.serv.delGiveReq(req_id).subscribe((data) => {
      this.fetch();
    })
  }

  ShowReqTitle(form_id: number){
    let title = ""
    let postFrom = ""
    this.post_serv.getPost(form_id.toString()).subscribe((data:Post) => {
      if(data.holder == 'COMMON'){
        postFrom = "user " + data.name + " " + data.middleName + " " + data.surname
      }
      else if(data.holder == 'VET'){
        postFrom = data.name + " " + data.middleName + " " + data.surname + "," + data.profession
      }
      else if(data.holder == 'INSTITUTION'){
        postFrom = "institution named " + data.instName
      }
      postFrom = postFrom.replace("  "," ")
      return "A " + postFrom + " wants to give you a pet"
    })
  }

}
