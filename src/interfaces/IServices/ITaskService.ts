import { ITask, TaskStats } from "../../types/task"

export interface ITaskService {
    createTask(taskData: ITask): Promise<ITask>
    getTasks(userId: string): Promise < ITask[] >
    getTaskById(taskId: string, userId: string): Promise < ITask >
    updateTask(taskId: string, taskData: Partial<ITask>, userId: string): Promise < ITask >
    deleteTask(taskId: string, userId: string): Promise < boolean >
    getTaskStats(userId: string): Promise < TaskStats >
}