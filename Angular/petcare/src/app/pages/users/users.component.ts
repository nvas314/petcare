import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgFor } from '@angular/common';
import { User } from '../../models/user.model';
import { MatHeaderCellDef, MatHeaderRowDef, MatRowDef, MatTable, MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-users',
  imports: [NgFor,
    MatTable,MatButton,MatHeaderCellDef,MatHeaderRowDef,MatRowDef,MatTableModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  u:User[] = []

  constructor(private serv:UserService){
    this.getUsers();
  }

  getUsers(){
    this.serv.getAllUsers().subscribe((data:User[]) =>{
      this.u=data
          })
  }

  changeUserStatus(userId:number,status:string){

  }

  changeUserPrivilages(userId:number,r:string){

  }
}
