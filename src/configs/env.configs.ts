import dotenv from 'dotenv';
dotenv.config();

export const config = {
    // Server Configuration
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',

    // MongoDB Connection
    MONGO_URI: process.env.MONGO_URI || 'NA',

    // JWT Secret
    JWT_SECRET: process.env.JWT_SECRET || 'Na',

    // Client URL for CORS,
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
}