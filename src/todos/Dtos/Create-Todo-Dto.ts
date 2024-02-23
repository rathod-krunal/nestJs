
import { IsNotEmpty, IsNumber  } from "class-validator"

export class CreateTodoDto {

    @IsNotEmpty()
    Todo: string | number


    IsCompleted : boolean
}