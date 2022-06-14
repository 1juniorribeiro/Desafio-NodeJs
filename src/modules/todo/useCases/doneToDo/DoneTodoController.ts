import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DoneToDoUseCase} from './DoneToDoUseCase';

class DoneToDoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const doneToDoUseCase = container.resolve(DoneToDoUseCase);

    const toDo = await doneToDoUseCase.execute(id);

    return response.status(201).json(toDo);
  }
}

export { DoneToDoController };
