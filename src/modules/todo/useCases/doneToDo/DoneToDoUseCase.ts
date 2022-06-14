import { inject, injectable } from 'tsyringe';

import { ToDo } from '../../../../modules/todo/infra/typeorm/entities/ToDo';
import { IToDosRepository } from '../../../../modules/todo/repositories/IToDoRepository';

@injectable()
class DoneToDoUseCase {
  constructor(
    @inject('ToDosRepository')
    private todosRepository: IToDosRepository,
  ) {}

  async execute(id: string): Promise<ToDo> {

    const todo = await this.todosRepository.done(id);

    return todo;
  }
}

export { DoneToDoUseCase };
