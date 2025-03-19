// src/services/taskService.ts
import { ITaskRepository } from '../interfaces/IRepositories/ITaskRepository';
import { ITaskService } from '../interfaces/IServices/ITaskService';
import { ITask, TaskStats, TaskPriority, TaskStatus } from '../types/task';


export class TaskService implements ITaskService {

    taskRepository : ITaskRepository;

    constructor(taskRepository: ITaskRepository){
        this.taskRepository = taskRepository;
    }


    async createTask(taskData: ITask): Promise<ITask> {
        return await this.taskRepository.createTask(taskData);
    };

    async getTasks(userId: string): Promise < ITask[] > {
        return await this.taskRepository.findByUserId(userId);
    };

    async getTaskById(taskId: string, userId: string): Promise < ITask > {
        const task = await this.taskRepository.findByUserIdAndId(userId, taskId);
        if(!task) {
            throw new Error('Task not found');
        }
      return task;
    };

    async updateTask(taskId: string, taskData: Partial<ITask>, userId: string): Promise < ITask > {
        const task = await this.taskRepository.updateByUserIdAndId(userId, taskId, taskData);
    
        if(!task) {
            throw new Error('Task not found');
        }
      
      return task;
    };

    async deleteTask(taskId: string, userId: string): Promise < boolean > {
        const task = await this.taskRepository.deleteByUserIdAndId(userId, taskId);
    
        if(!task) {
            throw new Error('Task not found');
        }
      
      return true;
    };

    async getTaskStats(userId: string): Promise < TaskStats > {
        console.log('////////////////////////////////// task           //////////stats./')
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        // Get all tasks for the user
        const tasks = await this.taskRepository.findByUserId(userId);
    
        // Calculate statistics
        const total = tasks.length;
        const completed = await this.taskRepository.countByUserIdAndStatus(userId, TaskStatus.COMPLETED);
        const overdue = await this.taskRepository.countOverdueTasks(userId, today);
    
        // Count by priority
        const low = await this.taskRepository.countByUserIdAndPriority(userId, TaskPriority.LOW);
        const medium = await this.taskRepository.countByUserIdAndPriority(userId, TaskPriority.MEDIUM);
        const high = await this.taskRepository.countByUserIdAndPriority(userId, TaskPriority.HIGH);
    
        // Count by status
        const todo = await this.taskRepository.countByUserIdAndStatus(userId, TaskStatus.TODO);
        const inProgress = await this.taskRepository.countByUserIdAndStatus(userId, TaskStatus.IN_PROGRESS);
    
        return {
            total,
            completed,
            overdue,
            byPriority: {
                low,
                medium,
                high
            },
            byStatus: {
                todo,
                inProgress,
                completed
            }
        };
    };

}