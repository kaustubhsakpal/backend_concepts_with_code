import express from 'express';
import cors from 'cors'
import cookieParser from "cookie-parser";
import { Authrouter } from './router/auth.router.js';
import morgan from 'morgan';

export const app = express();

app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
    methods:["GET","POST","PATCH","DELETE"]
}))
app.use(cookieParser())
app.use(morgan('dev'));
app.use('/api/auth',Authrouter)
