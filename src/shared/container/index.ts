import { container } from 'tsyringe';

import { IToDosRepository } from '../../modules/todo/repositories/IToDoRepository';
import { ToDosRepository } from '../../modules/todo/infra/typeorm/repositories/TodosRepository';

container.registerSingleton<IToDosRepository>(
  'ToDosRepository',
  ToDosRepository
);
