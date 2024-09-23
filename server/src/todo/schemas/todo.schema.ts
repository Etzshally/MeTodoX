import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Todo {
    @Prop()
    data: string;

    @Prop({ default: false })
    isCompleted?: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);