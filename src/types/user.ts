import mongoose from "mongoose";

export interface IUser {
    _id?: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
  }
  
export interface AuthCredentials {
    email: string;
    password: string;
}

export interface RegisterRequest extends AuthCredentials {
    username: string;
    confirmPassword: string;
}

export interface AuthResponse {
    user: {
        _id: string;
        username: string;
        email: string;
    };
    token: string;
}