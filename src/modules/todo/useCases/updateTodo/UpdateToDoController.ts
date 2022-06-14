import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateToDoUseCase } from './UpdateToDoUseCase';

class UpdateToDoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      description,
      priority,
      id
    } = request.body;

    const updateToDoUseCase = container.resolve(UpdateToDoUseCase);

    const toDo = await updateToDoUseCase.execute({
      description,
      priority,
      id
    });

    return response.status(201).json(toDo);
  }
}

export { UpdateToDoController };