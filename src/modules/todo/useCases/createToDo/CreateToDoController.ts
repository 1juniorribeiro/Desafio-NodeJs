import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateToDoUseCase } from './CreateToDoUseCase';

class CreateToDoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      description,
      priority
    } = request.body;

    const createToDoUseCase = container.resolve(CreateToDoUseCase);

    const todo = await createToDoUseCase.execute({
      description,
      priority
    });

    return response.status(201).json(todo);
  }
}

export { CreateToDoController };
