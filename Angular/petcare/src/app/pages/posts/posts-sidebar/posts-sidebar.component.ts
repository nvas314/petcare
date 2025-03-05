import { Component } from '@angular/core';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';

@Component({
  selector: 'app-posts-sidebar',
  imports: [MatSidenav,MatSidenavContainer],
  templateUrl: './posts-sidebar.component.html',
  styleUrl: './posts-sidebar.component.css'
})
export class PostsSidebarComponent {

}
