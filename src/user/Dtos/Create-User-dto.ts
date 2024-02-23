import {IsEmail, IsEnum, IsNotEmpty, IsString} from "class-validator";


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsEnum(["INTERN", "ENGINEER", "ADMIN"],{
        message: "Valid Role Required"
    })
    role: "INTERN"| "ENGINEER" | "ADMIN"
}