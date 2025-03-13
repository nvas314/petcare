import { User } from './../../models/user.model';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageBox } from '../../models/message-box.model';
import { Message } from '../../models/message.model';
import { MessageService } from '../../services/message.service';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NewMessage } from '../../reqDto/new-message.model';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-messages',
  imports: [NgFor,ReactiveFormsModule,FormsModule,DatePipe,NgClass,NgIf,RouterModule,
      MatCard,MatCardContent,MatIcon,MatButtonModule,MatFormField, MatLabel, MatDatepicker, MatDatepickerModule, MatHint,MatFormField,MatInputModule,MatButton],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  acccountImages = new Map()
  msgBoxes ?: MessageBox[]
  messages ?: Message[]
  other_user ?:User
  user_fullname ?: string
  user_id ?: string

  constructor(private serv:MessageService,
    private acc:AccountService,
    private route:ActivatedRoute,
    private cdr:ChangeDetectorRef
  ){
    this.user_fullname = localStorage.getItem('fullname')!
    this.user_id = localStorage.getItem('userid')!
  }

  messageform = new FormGroup({
    newmessage : new FormControl()
  })

  SumbitMessage(m:string){
        let message:NewMessage = new NewMessage()
    message.message = m;
    this.serv.addMessage(message,this.other_user?.id!.toString()!).subscribe((data) => {
      this.showMessages(this.other_user!);
      this.messageform.reset()
    })
  }

  ngOnInit(){
    this.showBoxes();
  }

  getImages(){
    this.msgBoxes!.forEach(acc => {
      this.acc.getaccountImage(acc.receiver?.id!).subscribe((data) => {
      if(data == null){
        this.acccountImages.set(acc.receiver?.id!,"/assets/images/noimageprofile.JPG")
      }
      else{
        this.acccountImages.set(acc.receiver?.id!,'data:image/jpeg;base64,' + data[0])
      }
      this.cdr.detectChanges();
      this.cdr.markForCheck();
      }
      )
    });
    this.acccountImages.set(parseInt(localStorage.getItem('userid')!),localStorage.getItem('accimage'))
  }

  showMessages(user:User){
    this.other_user = user;
    this.serv.showMessages(user.id?.toString()!).subscribe((data:Message[]) => {
      this.messages = data;
    this.showBoxes();
    })
  }

  showBoxes(){
    this.serv.showMessageBoxes().subscribe((data:MessageBox[]) => {
      this.msgBoxes = data;
      this.getImages();
      this.serv.loadUnreadMessages();//Badge
      this.cdr.detectChanges()
    })
  }

  delBox(id:number){
    this.serv.delMessageBox(id).subscribe(()=>{this.showBoxes()})
    const userExists = this.msgBoxes?.filter(msg => (msg.receiver == this.other_user))//Remove messages if selected user
    if(userExists?.length == 0){
      this.messages = []
      this.other_user = undefined;
      this.cdr.detectChanges()
    }
  }

  isHigherThan(changed:number,seen:number){
    if(seen == null){
      return true
    }
    if(changed>seen){
      return true
    }
    else{
      return false
    }
  }

  getFullname(user:User){
    // if(user.status = 'DELETED'){
    //   return "[Deleted]"
    // }
    let fullname = user.name + " " + user.middleName + " " +user.surname
    fullname = fullname.replace("  "," ")//No middlename
    return fullname
  }
}
