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
  post_id !: string;

  constructor(
    private pserv:PostService,
    private cserv:CommentService,
    private route:ActivatedRoute,
    private cdr:ChangeDetectorRef,
  ){this.show();}

  ngOnInit(){
    this.show();
  }

  show(){
    this.post_id = this.route.snapshot.paramMap.get('id')!;
    this.pserv.getPost(this.post_id).subscribe((data:Post) => {
            this.post = data;
            console.log(this.post)
      this.cdr.detectChanges();
    })
    this.cserv.getComments(this.post_id).subscribe((data:PostComment[]) => {
            this.c = data;
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
