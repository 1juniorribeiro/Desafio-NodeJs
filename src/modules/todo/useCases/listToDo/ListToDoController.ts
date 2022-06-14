import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListToDoUseCase } from './ListToDoUseCase';

class ListToDoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listToDoUseCase = container.resolve(ListToDoUseCase);

    const todos = await listToDoUseCase.execute();

    return response.status(200).json(todos);
  }
}

export { ListToDoController };
