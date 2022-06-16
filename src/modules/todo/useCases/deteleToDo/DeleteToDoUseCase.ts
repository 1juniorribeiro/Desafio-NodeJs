import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';

import { IToDosRepository } from '../../../../modules/todo/repositories/IToDoRepository';
import AppError from '../../../../shared/errors/AppError';

@injectable()
class DeleteToDoUseCase {
  constructor(
    @inject('ToDosRepository')
    private todosRepository: IToDosRepository,
  ) {}

  async execute(id: string): Promise<void> {
    if(!validate(id)) {
      throw new AppError('Invalid Id');
    }
    await this.todosRepository.delete(id);
  }
}

export { DeleteToDoUseCase };