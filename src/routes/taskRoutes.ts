import express from 'express';
import { protect } from '../middleware/auth';
import { TaskRepository } from '../repositories/task.repository';
import { TaskService } from '../services/taskServices';
import { TaskController } from '../controllers/taskController';

const router = express.Router();

router.use(protect);

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

router.route('/')
  .get(taskController.getAll.bind(taskController))
  .post(taskController.create.bind(taskController));

router.route('/:id')
  .get(taskController.getOne.bind(taskController))
  .put(taskController.update.bind(taskController))
  .delete(taskController.remove.bind(taskController));

router.route('/stats').get(taskService.getTaskStats.bind(taskController));

export default router;