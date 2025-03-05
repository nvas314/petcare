import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatMenu, MatMenuContent, MatMenuItem, MatMenuModule } from '@angular/material/menu';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AccountService } from '../services/account.service';
import { NgIf } from '@angular/common';
import { MatBadge } from '@angular/material/badge';
import { NotificationService } from '../services/notification.service';
import { PostService } from '../services/post.service';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message.model';
import { MessageBox } from '../models/message-box.model';

@Component({
  selector: 'app-header',
  imports: [RouterModule,NgIf,
    MatToolbar,MatButton,MatButtonModule,MatMenu,MatMenuContent,MatMenuItem,MatIcon,MatMenuModule,MatIconModule,MatBadge
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  fullname = ""
  username = ""
  image = ""
  href = ""

  newmessages = ""
  notifications = ""

  constructor(private serv:AuthService,
    private acc:AccountService,
    private not_serv:NotificationService,
    private mess_serv:MessageService,
    private router:Router,
    private cdr:ChangeDetectorRef
  ){
    this.href = window.location.href.split('/')[window.location.href.split('/').length-1]
  }

  changeActive(s:string){
    this.href = s
  }

  ngOnInit(){
    this.not_serv.getNotifications().subscribe((data:Notification[]) =>{
      this.notifications = data.length.toString()
      if(this.notifications == "0" ){this.notifications = ""}
    })
    this.mess_serv.showMessageBoxes().subscribe((data:MessageBox[]) => {
      let count = 0;
      data.forEach(mbox => {
        if(mbox.lastSeen! < mbox.lastChange!){
          count += 1;
        }
      });
      if (count == 0) {this.newmessages = ""}
      else {this.newmessages = count.toString()}
    })
    this.username == null
    if(localStorage.getItem('username') != null){ //If logged in
      this.fullname = localStorage.getItem('fullname')!
      this.username = localStorage.getItem('username')!
    }
    if (localStorage.getItem('username') == null) return;
    this.acc.getaccountImage(parseInt(localStorage.getItem('userid')!)).subscribe((data:string[]) => {
      if(data == null){
        this.image = "/assets/images/noimageprofile.JPG"
      }
      else{
        this.image = 'data:image/jpeg;base64,' + data[0]
      }
      localStorage.setItem('accimage',this.image)
      this.cdr.detectChanges();
    })
  }

    Logout(){
      if(localStorage.getItem('accessToken') != null){
                this.serv.Disconect();
        this.router.navigate(['/']);
        this.cdr.detectChanges();
      }
    }


}
