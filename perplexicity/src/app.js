import express from 'express';
import { Authrouter } from './router/auth.router.js';
import morgan from 'morgan';

export const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth',Authrouter)
