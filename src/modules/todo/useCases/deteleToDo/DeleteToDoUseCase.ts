import { inject, injectable } from 'tsyringe';

import { IToDosRepository } from '../../../../modules/todo/repositories/IToDoRepository';
import AppError from '../../../../shared/errors/AppError';

@injectable()
class DeleteToDoUseCase {
  constructor(
    @inject('ToDosRepository')
    private todosRepository: IToDosRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const toDo = await this.todosRepository.findById(id);

    if(!toDo) {
      throw new AppError('ToDo not found');
    }

    await this.todosRepository.delete(id);
  }
}

export { DeleteToDoUseCase };