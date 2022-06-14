import { Router } from 'express';

const toDoRoutes = Router();

toDoRoutes.get('/list')

toDoRoutes.post('/create')

toDoRoutes.put('/update')

toDoRoutes.delete('/delete')

toDoRoutes.patch('/done')

export default toDoRoutes;