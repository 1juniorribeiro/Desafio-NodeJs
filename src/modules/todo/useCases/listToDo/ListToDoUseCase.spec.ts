import { ToDoRepositoryInMemory } from "../../repositories/in-memory/ToDoRepositoryInMemory";
import { CreateToDoUseCase } from "../createToDo/CreateToDoUseCase";
import { Priority } from "../../dtos/ICreateToDoDTO";
import { ListToDoUseCase } from "./ListToDoUseCase";

let toDoRepositoryInMemory: ToDoRepositoryInMemory;
let createToDoUseCase: CreateToDoUseCase;
let listToDoUseCase: ListToDoUseCase;

describe('List To Dos', () => {
  beforeEach(() => {
    toDoRepositoryInMemory = new ToDoRepositoryInMemory();
    createToDoUseCase = new CreateToDoUseCase(toDoRepositoryInMemory);
    listToDoUseCase = new ListToDoUseCase(toDoRepositoryInMemory);
  })

  it('Should be able list To Dos', async () => {
    const toDo = await createToDoUseCase.execute({
      description: 'Teste',
      priority: Priority.medium,
    })

    const toDo2 = await createToDoUseCase.execute({
      description: 'Teste2',
      priority: Priority.high
    })

    const todos = await listToDoUseCase.execute();

    expect(todos).toHaveLength(2);
    expect(todos[0]).toHaveProperty('id')
    expect(todos[0]).toHaveProperty(['description'], 'Teste')
    expect(todos[0]).toHaveProperty(['priority'], Priority.medium)
    expect(todos[0]).toHaveProperty(['done'], false)
    expect(todos[0]).toHaveProperty('created_at')
    expect(todos[0].finished_at).toBeUndefined();
    expect(todos[1]).toHaveProperty('id')
    expect(todos[1]).toHaveProperty(['description'], 'Teste2')
    expect(todos[1]).toHaveProperty(['priority'], Priority.high)
    expect(todos[1]).toHaveProperty(['done'], false)
    expect(todos[1]).toHaveProperty('created_at')
    expect(todos[1].finished_at).toBeUndefined();
})
})