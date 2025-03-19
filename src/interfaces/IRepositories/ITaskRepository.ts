import { TaskDocument } from "../../models/Task"
import { ITask, TaskPriority, TaskStatus } from "../../types/task"

export interface ITaskRepository {
    findByUserId(userId: string): Promise<TaskDocument[]>
    findByUserIdAndId(userId: string, taskId: string): Promise<TaskDocument | null>
    updateByUserIdAndId(userId: string, taskId: string, data: Partial<TaskDocument>): Promise<TaskDocument | null> 
    deleteByUserIdAndId(userId: string, taskId: string): Promise<TaskDocument | null>
    countByUserIdAndStatus(userId: string, status: TaskStatus): Promise<number>
    countByUserIdAndPriority(userId: string, priority: TaskPriority): Promise<number>
    countOverdueTasks(userId: string, currentDate: Date): Promise<number>
    createTask (taskData: ITask): Promise<ITask>
}