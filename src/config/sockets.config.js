import { logger } from '../utils/logger.js';
import ServiceChats from '../services/chats.service.js';

const serviceChats = new ServiceChats();

export default (io) => {
  io.on('connection', (socket) => {
    logger.info('New client websocket connected:', { socketId: socket.id });
    //SOCKET CHAT
    socket.on('chat_front_to_back', async (message) => {
      try {
        serviceChats.createChatService(message);
        const messages = await serviceChats.getChatService();
        logger.info('Chat messages:', { messages });
        socket.emit('chat_back_to_front', messages);
        socket.broadcast.emit('chat_back_to_front', messages);
      } catch (error) {
        logger.error(error);
      }
    });

    //SOCKET DESCONEXION
    socket.on('disconnect', () => {
      logger.info('User was disconnected');
    });
  });
};
