import { inject, injectable } from 'tsyringe';

import { ToDo } from '../../../../modules/todo/infra/typeorm/entities/ToDo';
import { IToDosRepository } from '../../../../modules/todo/repositories/IToDoRepository';
import { Priority } from '../../../../modules/todo/dtos/ICreateToDoDTO';

interface IRequest {
  description: string;
  priority: Priority;
  done: false;
}

@injectable()
class CreateToDoUseCase {
  constructor(
    @inject('ToDosRepository')
    private todosRepository: IToDosRepository,
  ) {}

  async execute({description, done, priority}: IRequest): Promise<ToDo> {
    const todo = this.todosRepository.create({
      description,
      priority,
      done,
  });

  return todo;
}
}

export { CreateToDoUseCase };