import {Router} from 'express';
import { authmiddleware } from '../middleware/auth.middleware.js';
import { allchatscontroller, chatcontroller, deletecontroller, messagescontroller, sendmessagecontrolller } from '../controller/chat.controller.js';

 export const chatRouter =Router()

chatRouter.post('/message',authmiddleware,sendmessagecontrolller)
chatRouter.post('/',authmiddleware,allchatscontroller);
chatRouter.post('/:chatid',authmiddleware,chatcontroller);
chatRouter.post('/message/:chatid',authmiddleware,messagescontroller);
chatRouter.delete('/delete/:chatid',authmiddleware,deletecontroller);