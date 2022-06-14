import { ICreateToDoDTO, Priority } from "modules/todo/dtos/ICreateToDoDTO";
import { ToDo } from '../infra/typeorm/entities/ToDo';

interface IToDosRepository {
  create(data: ICreateToDoDTO): Promise<ToDo>;
  findAll(): Promise<ToDo[]>;
  update(id: string, description: string, priority: Priority): Promise<ToDo>;
  delete(id: string): Promise<void>;
  done(id: string): Promise<ToDo>;
}

export { IToDosRepository }