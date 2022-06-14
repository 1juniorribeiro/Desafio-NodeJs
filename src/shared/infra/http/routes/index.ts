import { Router } from 'express';

import toDoRoutes from './todo.routes';

const router = Router();

router.use('/todos', toDoRoutes);

export default router;