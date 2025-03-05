import { Component } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  imports: [FormsModule,ReactiveFormsModule,
      MatCard,MatCardTitle,MatCardSubtitle,MatCardContent,MatCardActions,MatCardFooter,MatCardHeader,MatButton,MatSlideToggle],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent {
  showEmail ?:boolean
  showTelephone ?: boolean

  constructor(private acc:AccountService,
    private router:Router
  ){}

  SaveChanges(){
    let dto : any = {
      showEmail : this.showEmail,
      showTelephone : this.showTelephone
    }
    this.acc.editUserSettings(dto).subscribe((data:any) => {
      this.router.navigate(['/']);
    })
  }
}
