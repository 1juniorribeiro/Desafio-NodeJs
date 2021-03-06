import { inject, injectable } from 'tsyringe';

import { ToDo } from '../../../../modules/todo/infra/typeorm/entities/ToDo';
import { IToDosRepository } from '../../../../modules/todo/repositories/IToDoRepository';

@injectable()
class ListToDoUseCase {
  constructor(
    @inject('ToDosRepository')
    private todosRepository: IToDosRepository,
  ) {}

  async execute(): Promise<ToDo[]> {
    const todos = await this.todosRepository.findAll();

    return todos;
  }
}

export { ListToDoUseCase };
