import mongoose from "mongoose";

// src/types/task.ts
export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
  }
  
  export enum TaskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
  }
  
  export interface ITask {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: Date;
    createdAt: Date;
    userId: mongoose.Types.ObjectId;
  }
  
  export interface TaskStats {
    total: number;
    completed: number;
    overdue: number;
    byPriority: {
      low: number;
      medium: number;
      high: number;
    };
    byStatus: {
      todo: number;
      inProgress: number;
      completed: number;
    };
  }
  