import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Announcement } from '../../../models/announcement.model';
import { AnnouncementService } from '../../../services/announcement.service';
import { ChangeUserDetails } from '../../../reqDto/change-user-details.model';
import { AccountService } from '../../../services/account.service';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-edit-account',
  imports: [ReactiveFormsModule,
      MatFormField, MatLabel, MatDatepicker, MatDatepickerModule, MatHint,MatFormField,MatInputModule,MatButton,MatButtonModule],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.css'
})
export class EditAccountComponent {

  user?:User
  current_username = ""
  constructor(private serv:AccountService,
    private authserv:AuthService,
    private cdr:ChangeDetectorRef,
    private route:Router
  ){
    serv.accountDetails().subscribe((data:User) => {
      this.user = data
      this.current_username = data.username!
      this.initializeForm();
    })
  }

  edit_form = new FormGroup({
    username : new FormControl(),
    password : new FormControl(),
    confirmpassword : new FormControl(),
    name : new FormControl(),
    surname : new FormControl(),
    middleName : new FormControl(),
    description : new FormControl(),
    email: new FormControl(),
    telephone: new FormControl()
  })

  initializeForm() {
    this.edit_form = new FormGroup({
      username: new FormControl(this.user?.username),
      password: new FormControl(),
      confirmpassword: new FormControl(),
      name: new FormControl(this.user?.name),
      surname: new FormControl(this.user?.surname),
      middleName: new FormControl(this.user?.middleName),
      description: new FormControl(this.user?.description),
      email: new FormControl(this.user?.email),
      telephone: new FormControl(this.user?.telephone)
    });
  }

  SaveChanges(){
    if(this.edit_form.controls.password.value && this.edit_form.controls.password.value != this.edit_form.controls.confirmpassword.value) return;//Confirm password,if pass not presentddoesnt change
    const cud:ChangeUserDetails = this.edit_form.value as ChangeUserDetails;
    this.serv.editDetails(cud).subscribe((data:ChangeUserDetails) => {
      if(this.imageFile != undefined){
        const formdata = new FormData()
        formdata.append('image',this.imageFile!)
        this.serv.setAccountImage(formdata).subscribe((data) => {
        this.authserv.SetUserDetails().then(() => {
          this.authserv.shareUserDetails()
          this.route.navigate(['/account']);
        });
        })
        if(cud.username != this.current_username){//Username changed , we need to login again
          this.authserv.Disconect();
          location.reload()
        }
      }
      else{
        this.route.navigate(['/account']); //Skip uploading the image
        if(cud.username != this.current_username){
          this.authserv.Disconect();
          location.reload()
        }
      }
    })
  }


  imageFile?:File = undefined;

  onImageUpload(event: any){
    this.imageFile = event.target.files[0]
  }
}
