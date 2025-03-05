import { User } from './../../models/user.model';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageBox } from '../../models/message-box.model';
import { Message } from '../../models/message.model';
import { MessageService } from '../../services/message.service';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  imports: [NgFor,ReactiveFormsModule,FormsModule,DatePipe,NgClass,NgIf,
      MatCard,MatCardContent,MatIcon,MatButtonModule,MatFormField, MatLabel, MatDatepicker, MatDatepickerModule, MatHint,MatFormField,MatInputModule,MatButton],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  acccountImages = new Map()
  msgBoxes ?: MessageBox[]
  messages ?: Message[]
  other_user ?:User

  constructor(private serv:MessageService,
    private acc:AccountService,
    private route:ActivatedRoute,
    private cdr:ChangeDetectorRef
  ){
    //this.other_user_id = this.route.snapshot.paramMap.get('id')!;
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
      this.getImages();
      this.cdr.detectChanges()
    this.showBoxes();
    this.cdr.detectChanges()
    })
  }

  showBoxes(){
    this.serv.showMessageBoxes().subscribe((data:MessageBox[]) => {
      this.msgBoxes = data;
      this.cdr.detectChanges()
    })
  }

  delBox(id:number){
    this.serv.delMessageBox(id).subscribe(()=>{this.showBoxes()})
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
}
