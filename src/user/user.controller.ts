import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./Dtos/Create-User-dto";
import { UpdateUserDto } from "./Dtos/Update-User-Dto";
import { User } from "./userInterface/userInterFace";

@Controller('user') 

export class UserController {
  
  constructor(private readonly userService: UserService) {}

  @Post()
  async Create(@Body() CreateUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(CreateUserDto);
  }

  @Get()
  async findall(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id:string): Promise<User> {
    return this.userService.findOne(id)
  }

  @Patch(':id') 
  async update(@Param('id') id:string, @Body() UpdateUserDto: UpdateUserDto ): Promise<User> {
    return this.userService.update(id,UpdateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id:string) : Promise<User>{
    return this.userService.delete(id)
  }
}