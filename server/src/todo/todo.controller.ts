import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo.schema';
import { TodoDTO } from './dtos/todo.dto';

@Controller('todos')
export class TodoController {
    constructor(private todoService: TodoService) { }

    @Get()
    async getAllTodos(): Promise<Todo[]> {
        return this.todoService.getAllTodos();
    }

    @Post('create')
    async createTodo(
        @Body(ValidationPipe) todo: TodoDTO
    ): Promise<Todo> {
        return this.todoService.createTodo(todo);
    }

    @Delete(':id')
    async deleteTodo(
        @Param('id') id: string
    ): Promise<Todo> {
        return await this.todoService.deleteTodo(id);
    }

    @Put('mark_ac/:id')
    async markAsCompleted(
        @Param('id') id: string
    ): Promise<Todo> {
        return await this.todoService.markAsCompleted(id)
    }
}
