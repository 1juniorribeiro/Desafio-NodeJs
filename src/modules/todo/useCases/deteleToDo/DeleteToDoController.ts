import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteToDoUseCase} from './DeleteToDoUseCase';

class DeleteToDoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { Id } = request.query;

    const deleteToDoUseCase = container.resolve(DeleteToDoUseCase);

    await deleteToDoUseCase.execute(String(Id));

    return response.status(204).json();
  }
}

export { DeleteToDoController }
