import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteToDoUseCase} from './DeleteToDoUseCase';

class DeleteToDoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteToDoUseCase = container.resolve(DeleteToDoUseCase);

    await deleteToDoUseCase.execute(id);

    return response.status(204);
  }
}

export { DeleteToDoController }
