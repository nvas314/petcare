import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ProfessionService } from '../../services/profession.service';
import { InstitutionService } from '../../services/institution.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InstEmpl } from '../../models/inst-empl.model';
import { ProfApp } from '../../models/prof-app.model';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { ApplicationDateDto } from '../../reqDto/application-date-dto.model';
import { InstOfficialTypeDto } from '../../reqDto/inst-official-type-dto.model';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatNativeDateModule, MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepicker, MatTimepickerModule } from '@angular/material/timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatSlider } from '@angular/material/slider';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderComponent } from '../../header/header.component';
import { PostBoxSecondaryComponent } from '../posts/post-box-secondary/post-box-secondary.component';
import { PostBoxComponent } from '../posts/post-box/post-box.component';
import { MatSelect } from '@angular/material/select';
import { UserGeneralService } from '../../services/user-general.service';
import { UserCommonView } from '../../models/user-details.model';
import { Institution } from '../../models/institution.model';

@Component({
  selector: 'app-applications',
  providers: [provideNativeDateAdapter()],
  imports: [NgIf, FormsModule, ReactiveFormsModule,DatePipe,RouterModule,
    MatTableModule, MatButton, MatLabel, MatFormField, MatDatepicker, MatTimepicker, RouterModule, FormsModule
    ,
    MatExpansionModule, MatButton, MatButtonModule, MatFormField, MatLabel, ReactiveFormsModule, MatAutocompleteModule, MatInputModule, FormsModule, MatFormFieldModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatTimepickerModule, MatNativeDateModule
  ],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
  ,changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationsComponent {

  instApps : InstEmpl[] = []
  profApps : ProfApp[] = []
  instEmplNames = new Map();
  ProfNames = new Map();
  InstNames = new Map();

  constructor(private profServ:ProfessionService,
    private instServ:InstitutionService,
    private userServ:UserGeneralService,
    private actRoute:ActivatedRoute,
    private router:Router,
    private cdr: ChangeDetectorRef
  ){
    this.fetchData()
  }

  fetchData(){
    this.profServ.getAllProfApps().subscribe((data : ProfApp[]) => {
      this.profApps = []
      this.profApps = [...this.profApps , ...data]
      this.findNamesProf()
      this.cdr.markForCheck()
    })
    this.instServ.getAllInstApps().subscribe((data : InstEmpl[]) => {
      this.instApps = []
      this.instApps = [...this.instApps , ...data]
      this.findNamesInst()
      this.cdr.markForCheck()//Refresh
    })
  }

  InstApply(type:string,id:number){
    const dto : InstOfficialTypeDto = new InstOfficialTypeDto()
    dto.id = id
    dto.type = type
    this.instServ.applyUserInstEmpl(dto).subscribe((data) => {this.fetchData()})
  }

  InstDelete(id:number){
    this.instServ.delInstEmpl(id).subscribe((data) => {this.fetchData()})
  }

  ProfApply(id:number){
    this.profServ.applyUserProfApp(id).subscribe((data) => {
      this.ProfDelete(id)
      this.fetchData()
    }
    )
  }

  ProfDelete(id:number){
    this.profServ.delProfApp(id).subscribe((data) => {this.fetchData()})
  }

  findNamesProf(){
    this.ProfNames.clear()
    this.profApps.forEach(p => {
      this.userServ.ShowUserDetails(p.userId?.toString()!).subscribe((data:UserCommonView) => {
          this.ProfNames.set(data.id,(data.name + " " + data.middleName + " " + data.surname).replace("  "," "))
      })
      this.cdr.markForCheck()
      this.cdr.detectChanges()
    });
  }

  findNamesInst(){
    this.InstNames.clear()
    this.instEmplNames.clear()
    this.instServ.getAllInsts().subscribe((data:Institution[]) => {
      data.forEach(inst => {
        this.InstNames.set(inst.id,inst.name)
      });
      this.cdr.detectChanges()
      this.cdr.markForCheck()
    })
    this.instApps.forEach(i => {
      this.userServ.ShowUserDetails(i.userId?.toString()!).subscribe((data:UserCommonView) => {
          this.instEmplNames.set(data.id,(data.name + " " + data.middleName + " " + data.surname).replace("  "," "))
          console.log(this.instEmplNames.get(data.id) + data.id)
          this.cdr.detectChanges()
          this.cdr.markForCheck()
      })
    });
  }

  //Select Date

  InstselectedDay: Date | null = null;
  InstselectedTime: Date | null = null;
  ProfselectedDay: Date | null = null;
  ProfselectedTime: Date | null = null;
  InstselectedDate: Date | null = null;
  ProfselectedDate: Date | null = null;

  selectedInstId: number = -1
  selectedProfId: number = -1

  onDateChange(){
    let time = this.InstselectedDay?.getTime()! + this.InstselectedTime?.getHours()!*3600*1000 + this.InstselectedTime?.getMinutes()!*60*1000
    this.InstselectedDate = new Date(time);
    time = this.ProfselectedDay?.getTime()! + this.ProfselectedTime?.getHours()!*3600*1000 + this.ProfselectedTime?.getMinutes()!*60*1000
    this.ProfselectedDate = new Date(time);
  }

  SumbitDateInst(id:number){
    if(this.InstselectedDate == null || this.selectedInstId == -1) return;
    let appd : ApplicationDateDto = {
      id : id,
      datetime : this.InstselectedDate!
    }
    this.instServ.scheduleMeeting(appd).subscribe((data) =>{
      this.selectedInstId = -1
      this.InstselectedDay = null;
      this.InstselectedTime = null;
      this.InstselectedDate = null;
      this.fetchData()
    })
  }

  SumbitDateProf(id:number){
    if(this.ProfselectedDate == null || this.selectedProfId == -1) return;
    let appd : ApplicationDateDto = {
      id : id,
      datetime : this.ProfselectedDate!
    }
    this.profServ.scheduleMeeting(appd).subscribe((data) =>{
      this.selectedInstId = -1
      this.ProfselectedDay = null;
      this.ProfselectedTime = null;
      this.ProfselectedDate = null;
      this.fetchData()
    })
  }

  SelectForDateInst(id:number){
    this.selectedInstId = id
  }

  SelectForDateProf(id:number){
    this.selectedProfId = id
  }

}
