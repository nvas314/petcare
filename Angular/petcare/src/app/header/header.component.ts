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
import { lastValueFrom } from 'rxjs';
import { GiveReq } from '../models/give-req.model';

@Component({
  selector: 'app-header',
  imports: [RouterModule,NgIf,
    MatToolbar,MatButton,MatButtonModule,MatMenu,MatMenuContent,MatMenuItem,MatIcon,MatMenuModule,MatIconModule,MatBadge
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user: any;

  image = ""
  href = ""

  newmessages = ""
  notifications = ""

  signedin?:boolean

  givereqs?:GiveReq[] = []
  notificationslist?:Notification[] = []

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
    this.serv.user$.subscribe((data) => {
      this.user = data;
    });//From Observer

    this.not_serv.notifications$.subscribe((data) => {
      this.updateBadge();
    });
    this.not_serv.giveReqs$.subscribe((data) => {
      this.updateBadge();
    });

    this.mess_serv.messages$.subscribe((count) => {
      this.newmessages = count === 0 ? "" : count.toString();
    });

    this.not_serv.loadNotifications();
    this.not_serv.loadGiveReqs();
    this.mess_serv.loadUnreadMessages();
  }


  Logout(){
    if(localStorage.getItem('accessToken') != null){
              this.serv.Disconect();
      this.router.navigate(['/']);
      location.reload();
    }
  }


  updateBadge() {
    const notifCount = this.not_serv.notificationsSubject.value;
    const giveReqsCount = this.not_serv.giveReqsSubject.value;
    this.notifications = notifCount + giveReqsCount === 0 ? "" : (notifCount + giveReqsCount).toString();
  }
}
