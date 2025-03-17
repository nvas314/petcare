import { RouterModule } from '@angular/router';
import { ChangeDetectorRef, Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgFor, NgIf } from '@angular/common';
import { User } from '../../models/user.model';
import { MatHeaderCellDef, MatHeaderRowDef, MatRowDef, MatTable, MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-users',
  imports: [NgFor,NgIf,RouterModule,
    MatTable,MatButton,MatHeaderCellDef,MatHeaderRowDef,MatRowDef,MatTableModule,MatMenu,MatMenuTrigger,MatMenuItem
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  u:User[] = []

  constructor(private serv:UserService,
    private cdr:ChangeDetectorRef
  ){
    this.getUsers();
  }

  getUsers(){
    this.serv.getAllUsers().subscribe((data:User[]) =>{
      this.u=data
      this.cdr.detectChanges()
    })
  }

  changeUserStatus(userId:number,status:string){
    this.serv.changeUserStatus(userId,status).subscribe((data:any) => {
      this.getUsers()
    })
  }

  changeUserPrivilages(userId:number,role:string){
    this.serv.changeUserRole(userId,role).subscribe((data:any) => {
      this.getUsers()
    })
  }

  deleteUser(userid:number){
    this.serv.deleteUser(userid).subscribe((data) =>
    this.getUsers()
    )
  }
}
