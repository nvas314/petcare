import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post.model';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { from, take } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MapInputComponent } from "../../misc/map-input/map-input.component";
import { Animal_List } from '../../../../constants';
import { UserService } from '../../../services/user.service';
import { AccountService } from '../../../services/account.service';
import { UserGeneralService } from '../../../services/user-general.service';
import { UserCommonView } from '../../../models/user-details.model';
import { MatTimepicker, MatTimepickerInput, MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'app-post-new',
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule,NgFor,NgForOf,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule, MatCardModule, MatRadioButton,MatTimepicker,MatTimepickerInput,MatTimepickerModule,
    MatRadioGroup, MatCheckbox, MatFormFieldModule, MatInputModule, MatDatepicker, MatDatepickerModule, MatSelect, MatOption, MapInputComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './post-new.component.html',
  styleUrl: './post-new.component.css'
})
export class PostNewComponent {
    post_form = new FormGroup({
      title: new FormControl('',Validators.required),
      animalName: new FormControl(''),
      animal: new FormControl(''),
      breed: new FormControl(''),
      longitude: new FormControl(''),
      latitude: new FormControl(''),
      status: new FormControl(false),
      type: new FormControl('LOST'),
      timestamp: new FormControl(''),
      date: new FormControl(new Date()),
      time: new FormControl(new Date(2024, 0, 0, 0, 0, 0)),
      collarText: new FormControl(''),
      description: new FormControl(''),
      healthCondition: new FormControl(''),
      images : new FormArray([]),
      holder : new FormControl('COMMON'),
      instName : new FormControl(''),
    })

    imageFile?:File;
    animal_List : string[] = []
    my_institutions : string[] = []
    is_professional : boolean = false
  constructor(private serv:PostService ,
    private userserv:UserGeneralService,
     private route:Router){
    this.animal_List = Animal_List
      userserv.ShowUserDetails(localStorage.getItem('userid')!).subscribe((data:UserCommonView) => {
        if(data.institution != null ){
          if(data.institution!.length>0){
            this.my_institutions = data.institution!
          }
        }
        if(data.profession != null){
          this.is_professional = true
        }
      })

    const initialValue = new Date();
    initialValue.setHours(12, 30, 0);
  }
  SumbitPost(){
      const postUser = this.post_form.value as Post
      let date = new Date(this.post_form.value.date!).getTime();
      let time = new Date(this.post_form.value.time!).getHours() + new Date(this.post_form.value.time!).getMinutes()/60;
      postUser.timestamp = date + time*3600
      // postUser.timestamp = new Date(this.post_form.value.timestamp!).getTime();
      if(this.post_form.value.status == true) postUser.status = "EMERGENCY"
      else postUser.status = "MISSING";console.log(postUser)

      const formdata = new FormData()
      for (let i = 0; i < this.a; i++) {
        if(this.b[i] == null) continue;
        formdata.append('image',this.b[i]!)
      }
      formdata.append('metadata',new Blob([JSON.stringify(postUser)], { type: 'application/json' }))


      if(this.post_form?.valid){
        this.serv.addPost(formdata).subscribe((data:any) =>{
            this.route.navigate(['/']);
        })
        }
      }

  UploadImage(){const formdata = new FormData()
  }

  b = [null,null,null,null,null]
  onImageUpload(event: any,i:number){
    this.b[i] = event.target.files[0]
  }


   a = 1
  addImage(){
    if(this.a>4)return;
    this.a = this.a +1;
  }
  remImage(i:number){
    if(this.a<2)return;
    this.a = this.a -1;
  }

   changeCrendentials(data:{lon:number,lat:number}){
    this.post_form.controls['longitude'].setValue(data.lon.toString())
    this.post_form.controls['latitude'].setValue(data.lat.toString())
   }

   get lonInput():number{
    if(this.post_form.value.longitude == ""){
      return 50;
    }
    return parseFloat(this.post_form.value.longitude!);
   }

   get latInput():number{
    if(this.post_form.value.latitude == ""){
      return 50;
    }
    return parseFloat(this.post_form.value.latitude!);
   }

   //Select Datetime

   selectedDay: Date | null = null;
   selectedTime: Date | null = null;
   selectedDate: Date | null = null;

   onDateChange(){
    // console.log(this.selectedTime)
    //  let time = date!.getTime()! + this.selectedTime?.getHours()!*3600*1000 + this.selectedTime?.getMinutes()!*60*1000
    //  this.selectedDate = new Date(time);
    //  time = this.selectedDay?.getTime()! + this.selectedTime?.getHours()!*3600*1000 + this.selectedTime?.getMinutes()!*60*1000
    //  this.selectedDate = new Date(time);
    //  console.log(this.selectedDate)
   }
  }
