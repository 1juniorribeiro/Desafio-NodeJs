import { ToDoRepositoryInMemory } from "../../repositories/in-memory/ToDoRepositoryInMemory";
import { CreateToDoUseCase } from "../createToDo/CreateToDoUseCase";
import { UpdateToDoUseCase } from "./UpdateToDoUseCase";
import { Priority } from "../../dtos/ICreateToDoDTO";
import AppError from '../../../../shared/errors/AppError';

let toDoRepositoryInMemory: ToDoRepositoryInMemory;
let createToDoUseCase: CreateToDoUseCase;
let updateToDoUseCase: UpdateToDoUseCase;

describe('Update To Do', () => {
  beforeEach(() => {
    toDoRepositoryInMemory = new ToDoRepositoryInMemory();
    createToDoUseCase = new CreateToDoUseCase(toDoRepositoryInMemory);
    updateToDoUseCase = new UpdateToDoUseCase(toDoRepositoryInMemory);
  })

  it('Should be able update To Do', async () => {
    const toDo = await createToDoUseCase.execute({
      description: 'Teste',
      priority: Priority.low,
    })

    const idTodo = toDo.id;
    const createdAtToDo = toDo.created_at;

    const toDoUpdated = await updateToDoUseCase.execute({
      id: toDo.id,
      description: 'Teste 2',
      priority: Priority.medium,
    })

    expect(toDoUpdated).toHaveProperty(['id'], idTodo)
    expect(toDoUpdated).toHaveProperty(['description'], 'Teste 2')
    expect(toDoUpdated).toHaveProperty(['priority'], Priority.medium)
    expect(toDoUpdated).toHaveProperty(['done'], false)
    expect(toDoUpdated).toHaveProperty('created_at', createdAtToDo)
    expect(toDoUpdated.finished_at).toBeUndefined();
  })

  it('Should not be able update To Do with invalid id', async () => {
    return expect(
      updateToDoUseCase.execute({
        id: 'teste',
        description: 'Teste',
        priority: Priority.low,
    })).rejects.toEqual(new AppError('ToDo not found'));
  })

  it('Should not be able update To Do with invalid priority', async () => {
    const toDo = await createToDoUseCase.execute({
      description: 'Teste',
      priority: Priority.low,
    })

    return expect(
      updateToDoUseCase.execute({
        id: toDo.id,
        description: 'Teste',
        priority: undefined,
      })).rejects.toEqual(new AppError('Priority is invalid, only low, medium or high'));
  })

  it('Should not be able update To Do with invalid description', async () => {
    const toDo = await createToDoUseCase.execute({
      description: 'Teste',
      priority: Priority.low,
    })

    return expect(
      updateToDoUseCase.execute({
        id: toDo.id,
        description: '',
        priority: Priority.low,
      })).rejects.toEqual(new AppError('Description is required'));
  })
})