import { ToDoRepositoryInMemory } from "../../repositories/in-memory/ToDoRepositoryInMemory";
import { CreateToDoUseCase } from "./CreateToDoUseCase";
import { Priority } from '../../dtos/ICreateToDoDTO';
import AppError from '../../../../shared/errors/AppError';

let createToDoUseCase: CreateToDoUseCase;
let toDoRepositoryInMemory: ToDoRepositoryInMemory;

describe('Create To Do', () => {
  beforeEach(() => {
    toDoRepositoryInMemory = new ToDoRepositoryInMemory();
    createToDoUseCase = new CreateToDoUseCase(toDoRepositoryInMemory);
  })

  it('Should be able create To Do', async () => {
    const toDo = await createToDoUseCase.execute({
      description: 'Teste',
      priority: Priority.low,  
    })
    expect(toDo).toHaveProperty('id')
    expect(toDo).toHaveProperty(['description'], 'Teste')
    expect(toDo).toHaveProperty(['priority'], Priority.low)
    expect(toDo).toHaveProperty(['done'], false)
    expect(toDo).toHaveProperty('created_at')
    expect(toDo.finished_at).toBeUndefined();
  })

  it('Should not be able to create To Do without Description', async () => {
    
    return expect(
      createToDoUseCase.execute({
        description: '',
        priority: Priority.low,
      })).rejects.toEqual(new AppError('Description is required'));
  }) 

  it('Should not be able to create To Do with wrong Priority', async () => {
      
      return expect(
        createToDoUseCase.execute({
          description: 'Teste',
          priority: undefined,
        })).rejects.toEqual(new AppError('Priority is invalid, only low, medium or high'));
  })
})
