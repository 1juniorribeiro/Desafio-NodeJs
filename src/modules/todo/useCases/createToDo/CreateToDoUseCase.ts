import { inject, injectable } from 'tsyringe';

import { ToDo } from '../../../../modules/todo/infra/typeorm/entities/ToDo';
import { IToDosRepository } from '../../../../modules/todo/repositories/IToDoRepository';
import { Priority } from '../../../../modules/todo/dtos/ICreateToDoDTO';
import AppError from '../../../../shared/errors/AppError';

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
    if (!description || description === '') {
      throw new AppError('Description is required');
    }

    if(priority !== Priority.low && priority !== Priority.medium && priority !== Priority.high) {
      throw new AppError('Priority is invalid, only low, medium or high');
    }

    const todo = this.todosRepository.create({
      description,
      priority
  });

  return todo;
}
}

export { CreateToDoUseCase };