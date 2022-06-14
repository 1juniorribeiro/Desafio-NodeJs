import { getRepository, Repository } from "typeorm";

import { ICreateToDoDTO, Priority } from "modules/todo/dtos/ICreateToDoDTO";
import { IToDosRepository } from "../../../repositories/IToDoRepository";

import { ToDo } from "../entities/ToDo";

class ToDosRepository implements IToDosRepository {
  private repository: Repository<ToDo>;

  constructor() {
    this.repository = getRepository(ToDo);
  }

  async create({
    id,
    description,
    priority,
    done
  }: ICreateToDoDTO): Promise<ToDo> {
    const toDo = this.repository.create({
      id,
      description,
      priority,
      done
    });

    await this.repository.save(toDo);

    return toDo;
  }
  async findAll(): Promise<ToDo[]> {
    const todos = await this.repository.find();

    return todos;
  }
  async update(id: string, description: string, priority: Priority): Promise<ToDo> {
    const todo = await this.repository.findOne({where: { id: id}});

    todo.description = description;
    todo.priority = priority;

    await this.repository.save(todo);

    return todo;
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete({ id: id });
  }

  async done(id: string): Promise<ToDo> {
    const todo = await this.repository.findOne({where: { id: id}});

    todo.done = true;
    todo.finished_at = new Date();

    await this.repository.save(todo);

    return todo;
  }

}

export { ToDosRepository };
