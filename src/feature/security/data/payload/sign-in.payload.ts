import {ApiProperty} from "@nestjs/swagger";
import {IsEmpty, IsNotEmpty} from 'class-validator';

export class SignInPayload{
    @ApiProperty()
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}