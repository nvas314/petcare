import { Timestamp } from 'rxjs';
export class GiveReq {
  id?:number;
  postid?:number;
  toholder?:string;
  toanimalHolderId?:number;
  timestamp?:Date;
}
