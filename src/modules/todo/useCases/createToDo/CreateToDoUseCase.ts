import { inject, injectable } from 'tsyringe';

import { ToDo } from '../../../../modules/todo/infra/typeorm/entities/ToDo';
import { IToDosRepository } from '../../../../modules/todo/repositories/IToDoRepository';
import { Priority } from '../../../../modules/todo/dtos/ICreateToDoDTO';

interface IRequest {
  description: string;
  priority: Priority;
}

@injectable()
class CreateToDoUseCase {
  constructor(
    @inject('ToDosRepository')
    private todosRepository: IToDosRepository,
  ) {}

  async execute({description, priority}: IRequest): Promise<ToDo> {
    const todo = this.todosRepository.create({
      description,
      priority
  });

  return todo;
}
}

export { CreateToDoUseCase };