import { InstEmpl } from './../../models/inst-empl.model';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfApp } from '../../models/prof-app.model';
import { ProfessionService } from '../../services/profession.service';
import { Router, Routes } from '@angular/router';
import { InstitutionService } from '../../services/institution.service';
import { NgFor, NgIf, NgSwitchDefault } from '@angular/common';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MapInputComponent } from '../misc/map-input/map-input.component';
import { Institution } from '../../models/institution.model';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-new-application',
  imports: [ReactiveFormsModule,FormsModule,NgIf,MapInputComponent,NgFor,MatSelect,MatOption,
    MatTab,MatTabGroup,MatFormFieldModule,MatButton,MatButtonModule,MatFormFieldModule,MatInputModule
  ],
  templateUrl: './new-application.component.html',
  styleUrl: './new-application.component.css'
})
export class NewApplicationComponent {

  //app:ProfApp = new ProfApp()
  type:string = "prof"
  institutions?:Institution[]

  application_form_prof = new FormGroup({
    profession : new FormControl("",[Validators.required]),
    description : new FormControl(),
    longitude : new FormControl("",[Validators.required,Validators.min(18),Validators.max(32)]),
    latitude : new FormControl("",[Validators.required,Validators.min(33),Validators.max(42)]),
  })

  application_form_inst = new FormGroup({
    instId : new FormControl(),
    description : new FormControl(),
    type : new FormControl()
  })

  constructor(private prof_serv:ProfessionService,
    private inst_serv:InstitutionService,
    private route:Router
  ){
    inst_serv.getAllInsts().subscribe((data:Institution[]) => {
      this.institutions = data
    })
  }

  CreateInstApplication(){
    const instApp = this.application_form_inst.value as InstEmpl
    instApp.instId = parseInt(this.application_form_inst.controls.instId.value)
          this.inst_serv.makeApplication(instApp).subscribe((data:InstEmpl) => {
      this.route.navigate(["/"])
    })
  }

  CreateProfApplication(){
    if(this.application_form_prof.valid) {
  const profApp = this.application_form_prof.value as ProfApp
  this.prof_serv.makeApplication(profApp).subscribe((data:ProfApp) =>{
    this.route.navigate(["/"])
  })
  }
  else{
    this.application_form_prof.markAllAsTouched()
  }
  }


  changeCrendentials(data:{lon:number,lat:number}){
    this.application_form_prof.controls['longitude'].setValue(data.lon.toString())
    this.application_form_prof.controls['latitude'].setValue(data.lat.toString())
   }


 get lonInput():number{
  if(this.application_form_prof.value.longitude == ""){
    return 50;
  }
  return parseFloat(this.application_form_prof.value.longitude!);
 }

 get latInput():number{
  if(this.application_form_prof.value.latitude == ""){
    return 50;
  }
  return parseFloat(this.application_form_prof.value.latitude!);
 }
}
