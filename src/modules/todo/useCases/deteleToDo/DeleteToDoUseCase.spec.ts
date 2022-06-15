import { ToDoRepositoryInMemory } from "../../repositories/in-memory/ToDoRepositoryInMemory";

import { DeleteToDoUseCase } from "./DeleteToDoUseCase";
import { CreateToDoUseCase } from "../createToDo/CreateToDoUseCase";

import { Priority } from '../../dtos/ICreateToDoDTO';
import AppError from '../../../../shared/errors/AppError';

let toDoRepositoryInMemory: ToDoRepositoryInMemory;
let deleteToDoUseCase: DeleteToDoUseCase;
let createToDoUseCase: CreateToDoUseCase;

describe('Delete To Do', () => {
  beforeEach(() => {
    toDoRepositoryInMemory = new ToDoRepositoryInMemory();
    deleteToDoUseCase = new DeleteToDoUseCase(toDoRepositoryInMemory);
    createToDoUseCase = new CreateToDoUseCase(toDoRepositoryInMemory);
  })

  it('Should be able delete To Do', async () => {
    const toDo = await createToDoUseCase.execute({
      description: 'Teste',
      priority: Priority.medium,
    })

    await deleteToDoUseCase.execute(toDo.id);

    const toDoDeleted = await toDoRepositoryInMemory.findById(toDo.id);

    expect(!toDoDeleted)
  })

  it('Should not be able to delete To Do with Invalid Id', async () => {
    await expect(deleteToDoUseCase.execute('')).rejects.toEqual(new AppError('ToDo not found'));
  })
})