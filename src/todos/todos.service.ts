import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './Dtos/Create-Todo-Dto';
import { UpdateTodoDto } from './Dtos/Update-User-Dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class TodosService {
  private Todos = [];

  GetAll() {
    return this.Todos;
  }

  GetOne(id: number) {
    const todo = this.Todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException('Todo Not Found');
    return todo;
  }

  Create(CreateTodoDto: CreateTodoDto) {
    const newUser = {
      id: Date.now(),
      ...CreateTodoDto,
    };
    this.Todos.push(newUser);
    return newUser;
  }

  Update(id: number, updateTodoDto: UpdateTodoDto) {
    this.Todos = this.Todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, ...updateTodoDto };
      }
      return todo;
    });
    return this.GetOne(id);
  }

  delete(id: number) {
    const deleteTodo = this.GetOne(id);

    this.Todos = this.Todos.filter((user) => user.id !== id);

    return deleteTodo;
  }
}
