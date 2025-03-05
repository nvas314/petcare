import { Component, Input } from '@angular/core';
import { Post } from '../../../models/post.model';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MapOutputComponent } from "../../misc/map-output/map-output.component";

@Component({
  selector: 'app-post-box-secondary',
  imports: [DatePipe, RouterModule, MapOutputComponent],
  templateUrl: './post-box-secondary.component.html',
  styleUrl: './post-box-secondary.component.css'
})
export class PostBoxSecondaryComponent {
  @Input() post!:Post;
}
