import { inject, injectable } from 'tsyringe';

import { ToDo } from '../../../../modules/todo/infra/typeorm/entities/ToDo';
import { IToDosRepository } from '../../../../modules/todo/repositories/IToDoRepository';
import { Priority } from '../../../../modules/todo/dtos/ICreateToDoDTO';
import AppError from '../../../../shared/errors/AppError';

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
    const toDo = await this.todosRepository.findById(id);

    if(!toDo) {
      throw new AppError('ToDo not found');
    }

    if (!description && description === '') {
      throw new AppError('Description is required');
    }

    if(priority !== Priority.low && priority !== Priority.medium && priority !== Priority.high) {
      throw new AppError('Priority is invalid, only low, medium or high');
    }

    const todo = await this.todosRepository.update(id, description, priority);

    return todo;
  }
}

export { UpdateToDoUseCase }
