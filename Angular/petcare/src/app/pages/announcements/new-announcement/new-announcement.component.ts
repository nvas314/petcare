import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { AnnouncementService } from '../../../services/announcement.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Announcement } from '../../../models/announcement.model';
import { MatFormField, MatFormFieldControl, MatHint, MatLabel } from '@angular/material/form-field';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-announcement',
  imports: [ReactiveFormsModule,
    MatFormField, MatLabel, MatDatepicker, MatDatepickerModule, MatHint,MatFormField,MatInputModule,MatButton,MatButtonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './new-announcement.component.html',
  styleUrl: './new-announcement.component.css'
})
export class NewAnnouncementComponent {


  constructor(private serv:AnnouncementService,
    private route:Router
  ){}

  ann_form = new FormGroup({
    title : new FormControl(),
    message : new FormControl(),
    date : new FormControl(),
    postId : new FormControl()
  })

  MakeAnnouncement(){
    const an:Announcement = this.ann_form.value as Announcement;
    this.serv.addAnnouncement(an).subscribe((data:Announcement) => {
      this.route.navigate(['/announcements'])
    })
  }
}
