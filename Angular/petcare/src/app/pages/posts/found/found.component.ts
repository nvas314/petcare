import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal } from '@angular/core';
import { PostsSidebarComponent } from "../posts-sidebar/posts-sidebar.component";
import { PostBoxComponent } from "../post-box/post-box.component";
import { UserService } from '../../../services/user.service';
import { Post } from '../../../models/post.model';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouteConfigLoadEnd, RouterModule, RouterOutlet } from '@angular/router';
import { PostBoxSecondaryComponent } from "../post-box-secondary/post-box-secondary.component";
import { PostService } from '../../../services/post.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { HeaderComponent } from "../../../header/header.component";
import { CdkHeaderRowDef } from '@angular/cdk/table';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatAutocomplete, MatAutocompleteModule, MatOption } from '@angular/material/autocomplete';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatSlider } from '@angular/material/slider';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-found',
  providers: [provideNativeDateAdapter()],
  imports: [PostsSidebarComponent, PostBoxComponent, NgFor, PostBoxComponent, RouterModule, PostBoxSecondaryComponent,HeaderComponent,FormsModule,
    MatExpansionModule, MatSidenavContainer, MatNavList, MatListItem, MatSidenavContent, MatSidenav, HeaderComponent,MatToolbar,MatButton,MatButtonModule,MatCheckbox,MatFormField,MatLabel,MatAutocomplete,MatOption,AsyncPipe,ReactiveFormsModule,MatAutocompleteModule,MatInputModule,FormsModule,MatFormFieldModule,ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,MatPaginator, MatTimepickerModule,MatNativeDateModule,MatSlider,MatSelect ],
  templateUrl: './found.component.html',
  styleUrl: './found.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoundComponent {

  p: Post[] = [];
  p_show: Post[] = [];

  isEmergency:boolean = false;
  isAdopted:boolean = false;
  isReturned:boolean = false;
  inInstitution:boolean = false;
  isAtDoctor:boolean = false;

  searchText:string =  ""
  searchAnimal:string = ""
  sortBy:string = ""

  constructor(private serv:PostService,
    private cdr: ChangeDetectorRef,
  ){
  }

  ngOnInit(){

    this.serv.getFoundPosts().subscribe((data:Post[]) => {
      this.p = data;
      this.p_show = data;
      this.cdr.detectChanges();
    })
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.filter()
  }

  readonly panelOpenState = signal(false);//For sidenav

  myControl = new FormControl('');//For autocomplete
  options: string[] = ['Cat', 'Dog', 'Snake'];
  filteredOptions: Observable<string[]> | undefined;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return `${value}`;
  }

  filter(){
    let searchText = this.searchText.toLocaleLowerCase()
    let searchAnimal = this.searchAnimal.toLocaleLowerCase()
    //Date
    let timestamp;
    if((this.selectedDayFrom == null || this.selectedTimeFrom == null || this.selectedDayTo == null || this.selectedTimeTo == null) &&
    (this.selectedDateFrom! > this.selectedDateTo!)){
      this.p_show = this.p_show.filter(s=> {
        timestamp = new Date(s.timestamp!);
        return ((timestamp >= this.selectedDateFrom!) && (timestamp <= this.selectedDateTo!));
        })
    }
    this.p_show = this.p_show.filter(s=> s.title!.toLocaleLowerCase().includes(searchText) ||
    s.animalName!.toLocaleLowerCase().includes(searchText))
    this.p_show = this.p_show.filter(s=> s.animal!.toLocaleLowerCase().includes(searchAnimal))
    //checkboxes , searchtext
    if(this.isEmergency){
      this.p_show = this.p_show.filter(s=> s.status == "EMERGENCY")
    }
    if(this.isAdopted){
      this.p_show = this.p_show.filter(s=> s.status == "ADOPT")
    }
    //SortBy
    if(this.sortBy = "distance"){
    }
    else if (this.sortBy = "date"){
      this.p_show = this.p_show.sort((a,b) =>{
        return a.timestamp! -b.timestamp!
      })
    }
  }


  selectedDayFrom: Date | null = null;
  selectedTimeFrom: Date | null = null;
  selectedDayTo: Date | null = null;
  selectedTimeTo: Date | null = null;
  selectedDateFrom: Date | null = null;
  selectedDateTo: Date | null = null;

  onDateChange(){
    let time = this.selectedDayFrom?.getTime()! + this.selectedTimeFrom?.getHours()!*3600*1000 + this.selectedTimeFrom?.getMinutes()!*60*1000
    this.selectedDateFrom = new Date(time);
    time = this.selectedDayTo?.getTime()! + this.selectedTimeTo?.getHours()!*3600*1000 + this.selectedTimeTo?.getMinutes()!*60*1000
    this.selectedDateTo = new Date(time);
    if(this.selectedDateFrom > this.selectedDateTo){return;}
    this.filter()
  }

  onChange(){
    this.filter()
  }


}
