import { UserCommonView } from "./user-details.model";

export class Post {
  id?:number;
  animalName?:string;
  animal?:string;
  breed?:string;
  title?:string;
  longitude?:number;
  latitude?:number;
  status?:string;
  type?:string;
  timestamp?:number;
  collarText?:string;
  description?:string;
  healthCondition?:string;
  holder?:string;
  animalHolderId?:number;
  //User Details
  username?:string;
  name?:string;
  surname?:string;
  middleName?:string;
  //other
  profession?:string;
  instName?:string;
  //Images
  images?:FormData[]
}
