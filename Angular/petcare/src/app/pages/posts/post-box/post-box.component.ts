import { BACKEND_URL } from './../../../../constants';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Post } from '../../../models/post.model';
import { RouterModule } from '@angular/router';
import { PostBoxSecondaryComponent } from "../post-box-secondary/post-box-secondary.component";
import { PostCommentsComponent } from '../../post-comments/post-comments.component';
import { PostService } from '../../../services/post.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { MatBadge } from '@angular/material/badge';

@Component({
  selector: 'app-post-box',
  imports: [RouterModule, PostBoxSecondaryComponent,NgIf,NgFor,DatePipe,NgClass,
     MatExpansionModule,MatGridTile,MatGridList,MatBadge],
  templateUrl: './post-box.component.html',
  styleUrl: './post-box.component.css'
})
export class PostBoxComponent {
  @Input() post!:Post;
  @Input() isfoundcomponent!:boolean;
  iscommonuser : boolean = true;
  imageUrl: SafeUrl | null = null;
  postImages : string[] = [];
  from:string =""

  constructor(private serv:PostService, private sanitizer: DomSanitizer , private cdr:ChangeDetectorRef){
    if(localStorage.getItem('role') == "COMMON"){
      this.iscommonuser = true
    }
    else{
      this.iscommonuser  = false
    }
  }

  ngOnInit(){
    this.getFrom()
    this.loadImage();
  }

  loadImage() {
    this.serv.getImages(this.post.id!).subscribe((data :string[]) => {
      this.postImages = [];
      this.postImages = data.map(image => 'data:image/jpeg;base64,' + image)
      this.cdr.detectChanges();
      //const objectURL = URL.createObjectURL(blob);
      //this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
}

getFrom(){
  let string = ""
  if(this.post.holder == "COMMON"){
    string = this.post.name + " " + this.post.middleName + " " + this.post.surname
    string = string.replace("  "," ")//if no middlename
    return "By " + string
  }
  if(this.post.holder == "VET"){
    string = this.post.name + " " + this.post.middleName + " " + this.post.surname
    string = string.replace("  "," ")//if no middlename
    string = string + " , " + this.post.profession
    return "By " + string
  }
  if(this.post.holder == "INSTITUTION"){
    string = this.post.instName!
    return "In " + string + " institution"
  }
  return
}

DelPost(){
  this.serv.delPost(this.post.id!).subscribe((data)=>{
    this.cdr.detectChanges();
    location.reload()
  })
}


i = 0;

getSlide() {
return this.postImages[this.i];
}

getPrev() {
this.i == 0 ? (this.i = this.postImages.length - 1) : this.i--;
}

getNext() {
this.i < this.postImages.length - 1 ? this.i++ : (this.i = 0);
}
}
