import {  IsNotEmpty  } from 'class-validator';

export class SigInRequestModel {
    @IsNotEmpty()
    phone: string;
    @IsNotEmpty()
    password: string;
}