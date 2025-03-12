import { UserCommonView } from "./user-details.model"

export class Institution {
  id?:number
  name?:string
  description?:string
  longitude?:number
  latitude?:number
  telephone?:string
  crew?:UserCommonView[]
}
