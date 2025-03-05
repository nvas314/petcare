import { Component } from '@angular/core';
import { PostsSidebarComponent } from "../posts-sidebar/posts-sidebar.component";
import { PostBoxComponent } from "../post-box/post-box.component";
import { UserService } from '../../../services/user.service';
import { Post } from '../../../models/post.model';
import { NgFor } from '@angular/common';
import { RouteConfigLoadEnd, RouterModule, RouterOutlet } from '@angular/router';
import { PostBoxSecondaryComponent } from "../post-box-secondary/post-box-secondary.component";
import { PostService } from '../../../services/post.service';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';

@Component({
  selector: 'app-found',
  imports: [PostsSidebarComponent, PostBoxComponent, NgFor, PostBoxComponent, RouterModule, PostBoxSecondaryComponent,
    MatSidenav,MatSidenavContainer,MatToolbar,MatIcon,MatNavList,MatSidenavContent
  ],
  templateUrl: './lost.component.html',
  styleUrl: './lost.component.css'
})
export class LostComponent {

  p: Post[] = [];

  constructor(private serv:PostService){
    this.serv.getLostPosts().subscribe((data:Post[]) => {

      this.p = data;
    })
    this.p.push({id:500,
      title:"NO POSTS",
      breed:"done"
    })
  }

}
