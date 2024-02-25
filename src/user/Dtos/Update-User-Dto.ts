import { IsEmail, IsOptional } from "class-validator";



export class UpdateUserDto {

  @IsOptional()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  readonly password: string;
}
