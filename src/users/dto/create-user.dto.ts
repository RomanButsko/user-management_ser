import { UserStatus } from './../entities/user.entity';
import { IsNumber, IsString, IsDate, IsEmail, IsEnum } from 'class-validator';

export class CreateUserDto {
    @IsNumber()
    readonly id: number;

    @IsString()
    name: string

    @IsEmail()
    email: string;

    @IsDate()
    register: Date;

    @IsDate()
    lastVisit: Date;

    @IsEnum(UserStatus)
    status: UserStatus;
}
