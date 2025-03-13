import { UserGeneralService } from './../../services/user-general.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { PostBoxComponent } from "../posts/post-box/post-box.component";
import { PostComment } from '../../models/post-comment.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { MatButton } from '@angular/material/button';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { UserCommonView } from '../../models/user-details.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-post-comments',
  imports: [NgFor, PostBoxComponent,RouterModule,FormsModule,ReactiveFormsModule,CommonModule,NgIf,
     MatFormField, MatLabel, MatDatepicker, MatDatepickerModule, MatHint,MatFormField,MatInputModule,MatButton
  ],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css'
})
export class PostCommentsComponent {
  post!:Post;
  c!:PostComment[];
  u!:UserCommonView[];
  fullname = new Map()
  postFullname = ""
  isAtLeastManager = false


  post_id !: string;
  timedout :boolean | null = false;

  constructor(
    private pserv:PostService,
    private userv:UserGeneralService,
    private cserv:CommentService,
    private route:ActivatedRoute,
    private cdr:ChangeDetectorRef,
  ){
    if(localStorage.getItem('role') == 'MANAGER' || localStorage.getItem('role') == 'APROVER' || localStorage.getItem('role') == 'ADMIN')
    if(localStorage.getItem('userid') == null) this.timedout = true
    userv.ShowUserDetails(localStorage.getItem('userid')!).subscribe((data:UserCommonView) => {
      if(data.status == "TIMEOUT"){
        this.timedout = true
      }
    })
    this.show();
  }

  ngOnInit(){
    this.show();
  }

  show(){
    this.post_id = this.route.snapshot.paramMap.get('id')!;
    this.pserv.getPost(this.post_id).subscribe((data:Post) => {
            this.post = data;
    this.postFullname = this.post.name + " " + this.post.middleName + " " + this.post.surname
      this.cdr.detectChanges();
    })
    this.cserv.getComments(this.post_id).subscribe((data:PostComment[]) => {
        this.c = data;
        data.forEach(cmnt => {
          this.userv.ShowUserDetails(cmnt.userid?.toString()!).subscribe((data:UserCommonView) => {
            let fullname = data.name + " " + data.middleName + " " + data.surname
            fullname = fullname.replace("  "," ") //No Middlename
            this.fullname.set(cmnt.userid , fullname)
          })
        });
    })
  }

  form = new FormGroup({
    comment : new FormControl()
  })

  Sumbit(){
    const newComment = this.form.value as PostComment
    this.cserv.addComments(this.post_id,newComment).subscribe((data:any) =>{
            this.show();
      this.form.reset();
    })
  }


  deleteComment(id:number){
    this.cserv.deleteComment(id.toString()).subscribe((data) => {this.show();})
  }
}
