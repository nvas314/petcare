import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-sign-in-up',
  imports: [SigninComponent,SignupComponent,
    MatCard,MatTab,MatTabGroup],
  templateUrl: './sign-in-up.component.html',
  styleUrl: './sign-in-up.component.css'
})
export class SignInUpComponent {

}
