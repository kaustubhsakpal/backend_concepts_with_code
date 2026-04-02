import express from 'express'
import { Authcontroller } from '../controller/Auth.controller.js';


const AuthRouter = express.Router();

AuthRouter.post('/register',Authcontroller)

export default AuthRouter;