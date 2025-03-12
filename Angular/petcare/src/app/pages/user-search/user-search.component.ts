import { UserCommonView } from './../../models/user-details.model';
import { ChangeDetectorRef, Component, SimpleChanges } from '@angular/core';
import { UserGeneralService } from '../../services/user-general.service';
import { MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router, RouterLink, RouterModule } from '@angular/router';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-search',
  imports: [NgFor,NgIf,RouterModule,
    MatLabel,MatInput,MatInputModule,MatButton,MatButtonModule,MatCard,MatCardContent
  ],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css'
})
export class UserSearchComponent {
  allResults : UserCommonView[] = []
  searchResults : UserCommonView[] = []
  searchRequest : boolean = false

constructor(private serv:UserGeneralService,
  private router:Router,
  private cdr:ChangeDetectorRef,
  private activatedRoute:ActivatedRoute
){
}

  SearchUserParam(searchinput:string){
    this.searchRequest = true
    this.searchResults = []
    if(searchinput.trim() == null) return
    this.serv.SearchUsersGeneral(searchinput.toLocaleLowerCase()).subscribe((data) => {
      console.log(data)
      this.searchResults = data;
    })
    this.cdr.detectChanges()
  }

  getFullname(user:UserCommonView){
    let fullname = user.name +" " + user.middleName +" " + user.surname
    fullname = fullname.replace("  "," ") //No Middlename
    return fullname
  }
}
