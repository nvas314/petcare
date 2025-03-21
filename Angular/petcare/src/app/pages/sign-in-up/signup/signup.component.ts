import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule,ReactiveFormsModule,CommonModule,
      MatFormFieldModule,MatInputModule,MatButtonModule,MatListModule,MatCardModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

    passwordConfirmedCorrectly = true;

    constructor(private auth:AuthService,
      private acc:AccountService,
      private route:Router
    ){}

    form = new FormGroup({
      username: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
      confirmpassword: new FormControl(''),//,[Validators.required,Validators.minLength(1),Validators.pattern('')]),
      name: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
      middleName: new FormControl(''),
      surname: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
      telephone: new FormControl('')
    })

    onSumbit(){
  if(this.form.controls.password.value != this.form.controls.confirmpassword.value) {
    this.passwordConfirmedCorrectly = false //Password not confirmed , show error
    return
  }
   if(this.form.valid) {
      const postUser = this.form.value as User
      if(this.form?.valid){
        this.auth.NewUser(postUser).subscribe((data) => {
        if(this.imageFile != undefined){
          const formdata = new FormData()
          formdata.append('image',this.imageFile!)
          this.acc.addnewImage(formdata,data.id!).subscribe((data) => {
            this.route.navigate(['/']);
          })
        }
        else{
          this.route.navigate(['/']); //Skip uploading the image
        }
        })
      }
    }
    else{
      this.form.markAllAsTouched()
    }
    }

    imageFile?:File = undefined;

    onImageUpload(event: any){
      this.imageFile = event.target.files[0]
    }
}
