import { inject, injectable } from 'tsyringe';

import { ToDo } from '../../../../modules/todo/infra/typeorm/entities/ToDo';
import { IToDosRepository } from '../../../../modules/todo/repositories/IToDoRepository';
import { Priority } from '../../../../modules/todo/dtos/ICreateToDoDTO';

interface IRequest {
  description: string;
  priority: Priority;
  id: string;
}

@injectable()
class UpdateToDoUseCase {
  constructor(
    @inject('ToDosRepository')
    private todosRepository: IToDosRepository,
  ) {}

  async execute({description, priority, id}: IRequest): Promise<ToDo> {
    const todo = await this.todosRepository.update(id, description, priority);

    return todo;
  }
}

export { UpdateToDoUseCase }
