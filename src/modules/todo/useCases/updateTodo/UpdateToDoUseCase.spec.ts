import { ToDoRepositoryInMemory } from "../../repositories/in-memory/ToDoRepositoryInMemory";
import { CreateToDoUseCase } from "../createToDo/CreateToDoUseCase";
import { UpdateToDoUseCase } from "./UpdateToDoUseCase";
import { Priority } from "../../dtos/ICreateToDoDTO";

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
})