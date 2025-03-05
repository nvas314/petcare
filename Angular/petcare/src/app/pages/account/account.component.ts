import { ChangeDetectorRef, Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/user.model';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { UserGeneralService } from '../../services/user-general.service';
import { UserCommonView } from '../../models/user-details.model';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [NgIf,NgFor,RouterModule,
    MatCard,MatCardTitle,MatCardSubtitle,MatCardContent,MatCardActions,MatCardFooter,MatCardHeader,MatButton
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  account:User = new User();
  userdetails:UserCommonView = new UserCommonView();

  image = ""
  constructor(private serv:AccountService,
    private usrGen:UserGeneralService,
    private cdr:ChangeDetectorRef
  ){
    this.fetchDetails()
  }

  fetchDetails(){
    this.serv.accountDetails().subscribe((data:User) => {
      this.account = data;
      this.cdr.detectChanges;
    })
    this.serv.getaccountImage(parseInt(localStorage.getItem('userid')!)).subscribe((data:string[]) => {
      if(data == null){
        this.image = ""
      }
      else{
        this.image = 'data:image/jpeg;base64,' + data[0]
      }
      this.cdr.detectChanges();
    })
    this.usrGen.ShowUserDetails(localStorage.getItem('userid')!).subscribe((data:UserCommonView) =>{
      this.userdetails = data
      console.log(data)
    })
  }

  deleteAccount(){

  }
}
