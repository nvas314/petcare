import { Timestamp } from "rxjs";
import { User } from "./user.model";

export class Message {
  senderId?:number;
  recieverId?:number;
  message?:string;
  timestamp?:number;
}
