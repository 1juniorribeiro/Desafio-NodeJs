import { inject, injectable } from 'tsyringe';

import { ToDo } from '../../../../modules/todo/infra/typeorm/entities/ToDo';
import { IToDosRepository } from '../../../../modules/todo/repositories/IToDoRepository';
import AppError from '../../../../shared/errors/AppError';

@injectable()
class DoneToDoUseCase {
  constructor(
    @inject('ToDosRepository')
    private todosRepository: IToDosRepository,
  ) {}

  async execute(id: string): Promise<ToDo> {
    const toDoToDone = await this.todosRepository.findById(id);

    if (!toDoToDone) {
      throw new AppError('ToDo not found');
    }

    const todo = await this.todosRepository.done(id);


    return todo;
  }
}

export { DoneToDoUseCase };
