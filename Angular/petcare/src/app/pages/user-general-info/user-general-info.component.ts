import { ChangeDetectionStrategy,ChangeDetectorRef, Component, inject } from '@angular/core';
import { UserGeneralService } from '../../services/user-general.service';
import { UserCommonView } from '../../models/user-details.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { User } from '../../models/user.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions, MatCardFooter, MatCardHeader } from '@angular/material/card';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { AccountService } from '../../services/account.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-user-general-info',
  imports: [NgIf,NgFor,NgForOf,RouterModule,
      MatCard,MatCardTitle,MatCardSubtitle,MatCardContent,MatCardActions,MatCardFooter,MatCardHeader,MatButton,MatLabel,MatInput,MatInputModule,MatButton,MatButtonModule],
  templateUrl: './user-general-info.component.html',
  styleUrl: './user-general-info.component.css'
})
export class UserGeneralInfoComponent {

  userDetails?:UserCommonView;
  user_id?:string;
  p:Post[] = []

  image = ""

  constructor(private serv:UserGeneralService,
    private msgserv:MessageService,
    private postserv:PostService,
    private accserv:AccountService,
      private route:ActivatedRoute,
    private router:Router,
  private cdr:ChangeDetectorRef){
        this.user_id = this.route.snapshot.paramMap.get('id')!;
        if(this.user_id == localStorage.getItem('userid')) router.navigate(['/account'])
        serv.ShowUserDetails(this.user_id).subscribe((data) => {
          this.userDetails = data;
      this.accserv.getaccountImage(this.userDetails?.id!).subscribe((data:string[]) => {
        if(data == null){
          this.image = ""
        }
        else{
          this.image = 'data:image/jpeg;base64,' + data[0]
        }
        this.cdr.detectChanges();
      })
      });

      postserv.getOwnPosts().subscribe((data:Post[]) =>{
        data.forEach(d=>{
          if(d.type == "FOUND" && d.status != "RETURNED"){
            this.p.push(d);
          }
        })
      })
  }

  sendMessage(){
        this.msgserv.addMessageBox(parseInt(this.user_id!)).subscribe((data) => {
      this.router.navigate(['/messages']);
    })
  }
}
