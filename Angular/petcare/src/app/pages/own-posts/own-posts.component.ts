import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTable, MatHeaderCellDef, MatHeaderRowDef, MatRowDef, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { NotificationService } from '../../services/notification.service';
import { GiveReq } from '../../models/give-req.model';

@Component({
  selector: 'app-own-posts',
  imports: [NgFor,RouterModule,NgIf,
    MatTable,MatButton,MatHeaderCellDef,MatHeaderRowDef,MatRowDef,MatTableModule],
  templateUrl: './own-posts.component.html',
  styleUrl: './own-posts.component.css'
})
export class OwnPostsComponent {
  p:Post[] = []
  type:string = '';
  id:string = '';

  constructor(private serv:PostService,
    private notif_serv:NotificationService,
    private actRoute:ActivatedRoute,
    private router:Router,
    private actroute:ActivatedRoute
  ){
    this.actRoute.queryParams.subscribe(params => {
      this.type = params['type'];
      this.id = params['id'];
    });
    this.getPosts();
  }

  getPosts(){
    this.p=[];
    this.serv.getOwnPosts().subscribe((data:Post[]) => {
      this.p=[];
      if(this.actroute.snapshot.queryParams['type']){
        data.forEach(d=>{
          if(d.type == "FOUND"){
            this.p.push(d)
          }
        })
      }
      else{
        this.p = data;
      }
    })
  }
  givePet(postId:number){
    let giveReq :GiveReq = {
      postid:postId!,
      toholder:this.type!.toLocaleUpperCase(),
      toanimalHolderId:parseInt(this.id!)
    }
    console.log(giveReq);
    this.serv.givePetReq(giveReq).subscribe((data) =>{
      this.router.navigate(['/'])
    })
  }

  setPostStatus(postId:number,status:string){
    this.serv.setOwnPostStatus(postId,status)
  }
}
