// const express = require('express')
import express, { Router } from 'express';
import userRouter from './routes/Register.route.js';
import morgan from 'morgan';
import cookieParser from "cookie-parser";
const app = express();

app.use(cookieParser());
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/auth',userRouter);
app.use('/api/auth',userRouter);
app.use('api/auth',userRouter);
export default app;