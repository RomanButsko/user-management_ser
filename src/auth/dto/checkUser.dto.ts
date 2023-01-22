import { IsEmail } from 'class-validator';

export class AuthCheck {
    @IsEmail()
    email: string;
}