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
  serv.SearchUsersGeneral().subscribe((data) => {
    this.allResults = data;
  })
}

  SearchUserParam(searchinput:string){
    this.searchRequest = true
    this.searchResults = []
    if(searchinput.trim() == null) return
    let name, surname,middleName , search;
    console.log(this.allResults)
    this.allResults.forEach(e => {
      if (e.name == null) name = ""
      else name = e.name.toLocaleLowerCase()
      if (e.surname == null) surname = ""
      else surname = e.surname.toLocaleLowerCase()
      if (e.middleName == null) middleName = ""
      else middleName = e.middleName.toLocaleLowerCase()
      search = searchinput.toLocaleLowerCase()

      if(name.includes(search)||
      surname.toLocaleLowerCase().includes(search)||
      middleName.toLocaleLowerCase().includes(search)){
        this.searchResults.push(e)
      }
    })
    this.cdr.detectChanges()
  }
}
