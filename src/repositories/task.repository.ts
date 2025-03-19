import { FilterQuery } from 'mongoose';
import { BaseRepository } from './base.repository';
import Task, { TaskDocument } from '../models/Task';
import { ITask, TaskPriority, TaskStatus } from '../types/task';
import { ITaskRepository } from '../interfaces/IRepositories/ITaskRepository';

export class TaskRepository extends BaseRepository<TaskDocument> implements ITaskRepository{

    constructor() {
        super(Task);
    }

    async findByUserId(userId: string): Promise<TaskDocument[]> {
        return this.find({ userId });
    }

    async findByUserIdAndId(userId: string, taskId: string): Promise<TaskDocument | null> {
        return this.findOne({ _id: taskId, userId });
    }

    async updateByUserIdAndId(userId: string, taskId: string, data: Partial<TaskDocument>): Promise<TaskDocument | null> {
        return this.updateOne({ _id: taskId, userId }, data);
    }

    async deleteByUserIdAndId(userId: string, taskId: string): Promise<TaskDocument | null> {
        return this.deleteOne({ _id: taskId, userId });
    }

    async countByUserIdAndStatus(userId: string, status: TaskStatus): Promise<number> {
        return this.count({ userId, status });
    }

    async countByUserIdAndPriority(userId: string, priority: TaskPriority): Promise<number> {
        return this.count({ userId, priority });
    }

    async countOverdueTasks(userId: string, currentDate: Date): Promise<number> {
        const filter: FilterQuery<TaskDocument> = {
            userId,
            dueDate: { $lt: currentDate },
            status: { $ne: TaskStatus.COMPLETED }
        };
        return this.count(filter);
    }

    async createTask (taskData: ITask): Promise<ITask>{
        return this.create(taskData)
    }
}
