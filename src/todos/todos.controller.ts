import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  ValidationPipe
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './Dtos/Create-Todo-Dto';
import { UpdateTodoDto } from './Dtos/Update-User-Dto';
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  GetAll() {
    return this.todosService.GetAll();
  }

  @Get(':id')
  GetOne(@Param('id',ParseIntPipe) id: number) {
    return this.todosService.GetOne(id);
  }

  @Post()
  Create(@Body(ValidationPipe) CreateTodoDto: CreateTodoDto) {
    return this.todosService.Create(CreateTodoDto);
  }

  @Patch(':id')
  Update(@Param('id',ParseIntPipe) id: number, @Body(ValidationPipe) UpdateTodoDto: UpdateTodoDto) {
    return this.todosService.Update(id, UpdateTodoDto);
  }

  @Delete(':id')
  delete(@Param('id',ParseIntPipe) id: number) {
    return this.todosService.delete(id);
  }
}
