import { Length,IsNotEmpty , IsMobilePhone } from "class-validator";
export class WorkerModel {
     @IsNotEmpty()
     name:string;
     user_name:string;

     @Length(6)
     password:string;

     @IsNotEmpty()
     age:string;

     @IsMobilePhone("ar-EG")
     phone:string;
     @IsNotEmpty()
     dep_id:number;
     work:string;

     @IsNotEmpty()
     city:string;
     @IsNotEmpty()
     region:string;
     status:string = "0";
     Image:string ='55';
     fish_tashbih :string = '44';
     national_card:string ='44';


}