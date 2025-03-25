import { Request, Response } from 'express';
import { io } from '../socket';
import { ITaskService } from '../interfaces/IServices/ITaskService';

export class TaskController {

    taskService: ITaskService;

    constructor(taskService: ITaskService){
        this.taskService = taskService;
    }

    async create(req: Request, res: Response): Promise<void>{
        try {
            console.log('triggered create task')
            const taskData = {
                ...req.body,
                userId: req.user._id,
            };

            const task = await this.taskService.createTask(taskData);

            // Emit socket event for real-time updates
            console.log('sending new task to ')
            io.to(req.user._id.toString()).emit('taskCreated', task);

            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
        }
    };

    async getAll(req: Request, res: Response): Promise<void>{
        try {
            console.log('triggered get all tasks')
            const tasks = await this.taskService.getTasks(req.user._id);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
        }
    };
 
    async getOne(req: Request, res: Response): Promise<void>{ 
        try {
            const task = await this.taskService.getTaskById(req.params.id, req.user._id);
            res.status(200).json(task);
        } catch (error) {
            res.status(404).json({ message: error instanceof Error ? error.message : 'An error occurred' });
        }
    };

    async update(req: Request, res: Response): Promise<void>{
        try {
            const task = await this.taskService.updateTask(req.params.id, req.body, req.user._id);
    
            // Emit socket event for real-time updates
            io.to(req.user._id.toString()).emit('taskUpdated', task);
    
            res.status(200).json(task);
        } catch (error) {
            res.status(404).json({ message: error instanceof Error ? error.message : 'An error occurred' });
        }
    };

    async remove(req: Request, res: Response): Promise<void>{
        try {
            await this.taskService.deleteTask(req.params.id, req.user._id);
    
            // Emit socket event for real-time updates
            console.log(`Emitting taskDeleted to user: ${req.user._id}`);
            io.to(req.user._id.toString()).emit("taskDeleted", req.params.id);
    
            res.status(200).json({ message: 'Task removed' });
        } catch (error) {
            res.status(404).json({ message: error instanceof Error ? error.message : 'An error occurred' });
        }
    };

    async getStatistics(req: Request, res: Response): Promise<void>{
        try {
            const stats = await this.taskService.getTaskStats(req.user._id);
            res.status(200).json(stats);
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
        }
    };

}


