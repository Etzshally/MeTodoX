import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class TodoService {
    constructor(
        @InjectModel(Todo.name)
        private todoModel: mongoose.Model<Todo>
    ) { }

    async getAllTodos(): Promise<Todo[]> {
        const todos = await this.todoModel.find();
        return todos;
    }

    async createTodo(todo: Todo): Promise<Todo> {
        const res = await this.todoModel.create(todo);
        return res;
    }

    async deleteTodo(id: string): Promise<Todo> {
        return await this.todoModel.findByIdAndDelete(id);
    }

    async markAsCompleted(id: string,): Promise<Todo> {
        return await this.todoModel.findByIdAndUpdate(id, { isCompleted: true }, { new: true });
    }

}
