import { Component } from '@angular/core';
import { InstitutionService } from '../../../services/institution.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Institution } from '../../../models/institution.model';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MapOutputComponent } from "../../misc/map-output/map-output.component";
import { MapInputComponent } from '../../misc/map-input/map-input.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-new-institution',
  imports: [ReactiveFormsModule,MapInputComponent,NgIf,
    MatFormField, MatLabel, MatButton, MatButtonModule, MatInputModule, MapOutputComponent],
  templateUrl: './new-institution.component.html',
  styleUrl: './new-institution.component.css'
})
export class NewInstitutionComponent {


  institution_form = new FormGroup({
    name : new FormControl("",[Validators.required]),
    description : new FormControl(),
    longitude : new FormControl("",[Validators.required,Validators.min(18),Validators.max(32)]),
    latitude : new FormControl("",[Validators.required,Validators.min(33),Validators.max(42)]),
    telephone : new FormControl(),
  })

    constructor(private serv:InstitutionService,
      private route:Router
    ){}

    SumbitInstitution(){
      if(this.institution_form.valid) {
      const inst:Institution = this.institution_form.value as Institution;
      this.serv.AddInstitution(inst).subscribe((data:Institution) => {
        this.route.navigate(['/institutions'])
      })
    }
    else{
      this.institution_form.markAllAsTouched()
    }
    }

    changeCrendentials(data:{lat:number,lon:number}){
      this.institution_form.controls['latitude'].setValue(data.lat.toString())
      this.institution_form.controls['longitude'].setValue(data.lon.toString())
     }


   get lonInput():number{
    if(this.institution_form.value.longitude == ""){
      return 50;
    }
    return parseFloat(this.institution_form.value.longitude!);
   }

   get latInput():number{
    if(this.institution_form.value.latitude == ""){
      return 50;
    }
    return parseFloat(this.institution_form.value.latitude!);
   }
}
