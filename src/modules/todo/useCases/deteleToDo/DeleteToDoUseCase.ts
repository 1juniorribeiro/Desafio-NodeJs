import { inject, injectable } from 'tsyringe';

import { IToDosRepository } from '../../../../modules/todo/repositories/IToDoRepository';

@injectable()
class DeleteToDoUseCase {
  constructor(
    @inject('ToDosRepository')
    private todosRepository: IToDosRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.todosRepository.delete(id);
  }
}

export { DeleteToDoUseCase };