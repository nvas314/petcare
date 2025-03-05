import { LoginToken } from '../../../models/logintoken.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-signin',
  imports: [FormsModule,ReactiveFormsModule,CommonModule,
    MatFormFieldModule,MatInputModule,MatButtonModule,MatListModule,MatCardModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

    constructor(private auth:AuthService,private route:Router){}

    form = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('')
    })

    onSumbit(){
      const postUser = this.form.value as User
      if(this.form?.valid){
        this.auth.Authenticate(postUser).subscribe((data : LoginToken) => {
            localStorage.setItem('accessToken', data.token);
            this.auth.SetUserDetails();
            this.route.navigate(['/']);
        }
      )
      }
    }
}
