import { from } from "rxjs";
import { IsNotEmpty } from 'class-validator';

export class Createtaskdto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description : string;
}