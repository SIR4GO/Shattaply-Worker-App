import { Length, IsNotEmpty , IsMobilePhone } from 'class-validator';
export class WorkerModel {

     id: any;
     @IsNotEmpty()
     name: string;
     user_name: string;

     @Length(6)
     password: string;

     @IsNotEmpty()
     age: string;

     @IsMobilePhone('ar-EG')
     phone: string;
     @IsNotEmpty()
     dep_id: number;
     work: string;

     @IsNotEmpty()
     city: string;
     @IsNotEmpty()
     region: string;
     status = '0';
     Image = '55';
     fish_tashbih = '66';
     national_card = '77';
     total_rate = '0';

}
