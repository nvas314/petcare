import { User } from "./user.model";

export class MessageBox {
  id?:number;
  lastChange?:number;
  lastSeen?:number;
  receiver?:User;
}
