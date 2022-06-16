import { ToDoRepositoryInMemory } from "../../repositories/in-memory/ToDoRepositoryInMemory";
import { CreateToDoUseCase } from "../createToDo/CreateToDoUseCase";
import { DoneToDoUseCase } from "./DoneToDoUseCase";
import { Priority } from "../../dtos/ICreateToDoDTO";
import AppError from '../../../../shared/errors/AppError';

let toDoRepositoryInMemory: ToDoRepositoryInMemory;
let createToDoUseCase: CreateToDoUseCase;
let doneToDoUseCase: DoneToDoUseCase;

describe('Done To Do', () => {
  beforeEach(() => {
    toDoRepositoryInMemory = new ToDoRepositoryInMemory();
    createToDoUseCase = new CreateToDoUseCase(toDoRepositoryInMemory);
    doneToDoUseCase = new DoneToDoUseCase(toDoRepositoryInMemory);
  })

  it('Should be able done To Do', async () => {
    const toDo = await createToDoUseCase.execute({
      description: 'Teste',
      priority: Priority.high
    })

    const toDoUpdated = await doneToDoUseCase.execute(toDo.id);

    expect(toDoUpdated).toHaveProperty('id')
    expect(toDoUpdated).toHaveProperty(['description'], 'Teste')
    expect(toDoUpdated).toHaveProperty(['priority'], Priority.high)
    expect(toDoUpdated).toHaveProperty(['done'], true)
    expect(toDoUpdated).toHaveProperty('created_at')
    expect(toDoUpdated).toHaveProperty('finished_at')
  })

  it('Should not be able done To Do with Invalid Id', async () => {
    await expect(doneToDoUseCase.execute('')).rejects.toEqual(new AppError('Invalid Id'));
  })
})