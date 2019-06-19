import {  IsNotEmpty  } from 'class-validator';
export class PreviousWorkModel{
    @IsNotEmpty()
    image: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    worker_id: string;
}