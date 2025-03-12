import { NewMessageBox } from './../reqDto/new-message-box.model';
import { BACKEND_URL } from './../../constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageBox } from '../models/message-box.model';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { NewMessage } from '../reqDto/new-message.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesSubject = new BehaviorSubject<number>(0);
  messages$ = this.messagesSubject.asObservable();

  constructor(private http:HttpClient) { }

  addMessageBox(other_user_id:number){
    let msgBox:NewMessageBox = new NewMessageBox();
    msgBox.receiverId = other_user_id
        return this.http.post<NewMessageBox>(BACKEND_URL+"/boxmessages/user/", msgBox)
  }

  showMessageBoxes(){
    return this.http.get<MessageBox[]>(BACKEND_URL+"/boxmessages/user/")
  }

  delMessageBox(id:number){
    return this.http.delete<MessageBox>(BACKEND_URL+"/boxmessages/user/"+id)
  }

  addMessage(message:NewMessage,to_user_id:string){
    return this.http.post<NewMessage>(BACKEND_URL+"/messages/user/"+to_user_id,message)
  }

  showMessages(of_user_id:string){
    return this.http.get<Message[]>(BACKEND_URL+"/messages/user/"+of_user_id)
  }


  loadUnreadMessages() {
    this.showMessageBoxes().subscribe((data) => {
      const d = data.filter((msgBox) => msgBox.lastSeen! < msgBox.lastChange!)
      this.messagesSubject.next(d.length)
    })
  }

}
