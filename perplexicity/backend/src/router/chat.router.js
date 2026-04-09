import {Router} from 'express';
import { authmiddleware } from '../middleware/auth.middleware.js';
import { sendmessagecontrolller } from '../controller/chat.controller.js';

 export const chatRouter =Router()

chatRouter.post('/message',authmiddleware,sendmessagecontrolller)