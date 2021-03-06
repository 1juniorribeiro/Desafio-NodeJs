import { ICreateToDoDTO, Priority } from "modules/todo/dtos/ICreateToDoDTO";
import { ToDo } from '../infra/typeorm/entities/ToDo';

interface IToDosRepository {
  create(data: ICreateToDoDTO): Promise<ToDo>;
  findAll(): Promise<ToDo[]>;
  findById(id: string): Promise<ToDo>;
  update(id: string, description: string, priority: Priority): Promise<ToDo>;
  delete(Id: string): Promise<void>;
  done(id: string): Promise<ToDo>;
}

export { IToDosRepository }