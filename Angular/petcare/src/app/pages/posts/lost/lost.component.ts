import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { PostBoxComponent } from "../post-box/post-box.component";
import { UserService } from '../../../services/user.service';
import { Post } from '../../../models/post.model';
import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { RouteConfigLoadEnd, RouterModule, RouterOutlet } from '@angular/router';
import { PostBoxSecondaryComponent } from "../post-box-secondary/post-box-secondary.component";
import { PostService } from '../../../services/post.service';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatOption, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormField, MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSlider } from '@angular/material/slider';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { startWith, map, Observable } from 'rxjs';
import { Animal_List } from '../../../../constants';
import { HeaderComponent } from '../../../header/header.component';
import { UserCommonView } from '../../../models/user-details.model';
import { UserGeneralService } from '../../../services/user-general.service';

@Component({
  selector: 'app-found',
  imports: [ PostBoxComponent, NgFor, PostBoxComponent, RouterModule, PostBoxSecondaryComponent,HeaderComponent,FormsModule,DecimalPipe,NgIf,
      MatExpansionModule, MatSidenavContainer, MatNavList, MatListItem, MatSidenavContent, MatSidenav, HeaderComponent,MatToolbar,MatButton,MatButtonModule,MatCheckbox,MatFormField,MatLabel,MatAutocomplete,MatOption,AsyncPipe,ReactiveFormsModule,MatAutocompleteModule,MatInputModule,FormsModule,MatFormFieldModule,ReactiveFormsModule,MatCard,MatCardContent,
      MatFormFieldModule, MatInputModule, MatDatepickerModule,MatPaginator, MatTimepickerModule,MatNativeDateModule,MatSlider,MatSelect
  ],
  templateUrl: './lost.component.html',
  styleUrl: './lost.component.css'
})
export class LostComponent {

  p: Post[] = [];
  p_filtered: Post[] = [];
  p_show: Post[] = [];
  timedout = false
  user_role = ""

  isEmergency:boolean = false;
  isAdopted:boolean = false;
  isReturned:boolean = false;
  inInstitution:boolean = false;
  isAtDoctor:boolean = false;
  Returned:boolean = false;

  animal_List = Animal_List
  searchText:string =  ""
  searchAnimal:string = ""
  sortBy:string = ""

  constructor(private serv:PostService,
    private userv:UserGeneralService,
    private cdr: ChangeDetectorRef,
  ){
    this.user_role = localStorage.getItem('role')!
    this.searchAnimal = 'All'
    userv.ShowUserDetails(localStorage.getItem('userid')!).subscribe((data:UserCommonView) => {
      if(data.status == "TIMEOUT"){
        this.timedout = true
      }
    })
  }

  ngOnInit(){
    this.serv.getLostPosts().subscribe((data:Post[]) => {
      this.p = data;
      this.p_filtered = data;
      this.cdr.detectChanges();
      this.filter()
      this.ShowPage(0)
    })
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
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
    this.p_filtered = this.p
    //Date
    let timestamp;
    if(!(this.selectedDayFrom == null || this.selectedTimeFrom == null || this.selectedDayTo == null || this.selectedTimeTo == null) &&
    (this.selectedDateFrom! < this.selectedDateTo!)){
      this.p_filtered = this.p_filtered.filter(s=> {
        timestamp = new Date(s.timestamp!);
        return ((timestamp >= this.selectedDateFrom!) && (timestamp <= this.selectedDateTo!));
        })
    }
    this.p_filtered = this.p_filtered.filter(s=> s.title!.toLocaleLowerCase().includes(searchText))
    if(searchAnimal != 'all'){
      this.p_filtered = this.p_filtered.filter(s=> s.animal!.toLocaleLowerCase().includes(searchAnimal))
    }
    //checkboxes , searchtext
    if(this.isEmergency){
      this.p_filtered = this.p_filtered.filter(s=> s.status == "EMERGENCY")
    }
    if(this.isAdopted){
      this.p_filtered = this.p_filtered.filter(s=> s.status == "ADOPT")
    }
    if(this.inInstitution && this.isAtDoctor){
      this.p_filtered = this.p_filtered.filter(s=> s.holder != "COMMON")//Not User
    }
    else if(this.inInstitution){
      this.p_filtered = this.p_filtered.filter(s=> s.holder == "INSTITUTION")
    }
    else if(this.isAtDoctor){
      this.p_filtered = this.p_filtered.filter(s=> s.holder == "VET")
    }
    if(this.Returned){
      this.p_filtered = this.p_filtered.filter(s=> s.status == "RETURNED")
    }
    else {
      this.p_filtered = this.p_filtered.filter(s=> s.status != "RETURNED")
    }
    this.p_show = this.p_filtered
    this.setPages()
    this.ShowPage(this.pagenumber!)
    this.cdr.detectChanges()
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

  //Paginator

  numberofpages?: number;
  numberofitems?: number;
  pagelength?:number = 2 //how many posts in a page
  pagenumber?:number = 0

  setPages(){
    this.numberofpages = Math.ceil(this.p_filtered.length/this.pagelength!)+1
    this.numberofitems = this.p_filtered.length
  }
  handlePageEvent(e: PageEvent){
    this.pagelength = e.pageSize //how many posts
    this.pagenumber = e.pageIndex //which  page i am now
    this.ShowPage(this.pagenumber)
  }

  ShowPage(page:number){
    this.p_show = []
    for(let i=page*this.pagelength!;i<(page+1)*this.pagelength!;i++){
      if(i>this.p_filtered.length-1) break
      this.p_show.push(this.p_filtered[i])
    }
    this.cdr.detectChanges()
  }
}
