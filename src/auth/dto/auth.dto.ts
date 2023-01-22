import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    password: string;
}