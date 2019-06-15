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
     address:string;
     @IsNotEmpty()
     dept_id:number;
     work:string;


     personalImage:string ='';
     criminalImage:string = '';
     cardImage:string ='';


}