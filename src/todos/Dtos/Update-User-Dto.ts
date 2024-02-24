import { CreateTodoDto } from './Create-Todo-Dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
