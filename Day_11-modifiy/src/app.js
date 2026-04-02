import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
dotenv.config();

import Authrouter from './router/auth.routher.js';
 const app = express();

app.use(express.json());
app.use(cookieParser())
app.use('/api/auth',Authrouter)
// app.use('/api/auth',Authrouter)

export default app;
