import express from 'express';
import { chatController } from '../controller/chat.controller.js';
import { isLogged, isUser } from '../middleware/auth.js';
const chatRouter = express.Router();

chatRouter.get('/', isUser, isLogged, chatController.chat);

export default chatRouter;
