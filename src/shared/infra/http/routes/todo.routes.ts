import { Router } from 'express';

import { CreateToDoController } from '../../../../modules/todo/useCases/createToDo/CreateToDoController';
import { ListToDoController } from '../../../../modules/todo/useCases/listToDo/ListToDoController';
import { DeleteToDoController } from '../../../../modules/todo/useCases/deteleToDo/DeleteToDoController';
import { DoneToDoController } from '../../../../modules/todo/useCases/doneToDo/DoneTodoController';
import { UpdateToDoController } from '../../../../modules/todo/useCases/updateTodo/UpdateToDoController';

const toDoRoutes = Router();

const createToDoController = new CreateToDoController();
const listToDoController = new ListToDoController();
const doneToDoController = new DoneToDoController();
const deleteToDoController = new DeleteToDoController();
const updateToDoController = new UpdateToDoController();
 

toDoRoutes.get('/list', listToDoController.handle);

toDoRoutes.post('/create', createToDoController.handle);

toDoRoutes.put('/update', updateToDoController.handle);

toDoRoutes.delete('/delete', deleteToDoController.handle);

toDoRoutes.put('/done', doneToDoController.handle);

export default toDoRoutes;