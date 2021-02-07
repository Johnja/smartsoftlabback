import 'reflect-metadata';
import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { createConnection } from 'typeorm';


// importing routes
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/users.routes";
import productRoutes from "./routes/products.routes";

// initialization
const app = express();
createConnection();

// middlewares
app.use(morgan('dev'));
app.use(json());
app.use(cors());
dotenv.config()

//Public directory 
app.use(express.static('public'));

// routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/login', authRoutes);

export default app;