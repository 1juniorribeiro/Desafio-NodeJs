import { ICreateToDoDTO, Priority } from "../../dtos/ICreateToDoDTO";
import { IToDosRepository } from "../IToDoRepository";
import { ToDo } from "../../infra/typeorm/entities/ToDo";

class ToDoRepositoryInMemory implements IToDosRepository {
  toDo: ToDo[] = [];

  async create({
    description,
    priority,
    done,
    id
  }: ICreateToDoDTO): Promise<ToDo> {
    const toDo = new ToDo();

    Object.assign(toDo, {
      id,
      description,
      priority,
      done: false,
      created_at: new Date()
    });

    this.toDo.push(toDo);

    return toDo;
  }

  async findAll(): Promise<ToDo[]> {
    return this.toDo
  }
  async update(id: string, description: string, priority: Priority): Promise<ToDo> {
    const toDo = this.toDo.find(t => t.id === id);

    toDo.description = description;
    toDo.priority = priority;

    return toDo;
  }
  async delete(Id: string): Promise<void> {
    const toDo = this.toDo.find(t => t.id === Id);

    this.toDo.splice(this.toDo.indexOf(toDo), 1);
  }
  async done(id: string): Promise<ToDo> {
    const toDo = this.toDo.find(t => t.id === id);

    toDo.done = true;
    toDo.finished_at = new Date();

    return toDo;
  }
  
  async findById(id: string): Promise<ToDo> {
    const toDo = this.toDo.find(t => t.id === id);

    return toDo;
  }
}

export { ToDoRepositoryInMemory }
