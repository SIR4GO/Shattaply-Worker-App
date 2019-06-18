import {  IsNotEmpty  } from 'class-validator';
export class PreviousWorkModel{
    @IsNotEmpty()
    image: string = '55';
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    worker_id: string;
}