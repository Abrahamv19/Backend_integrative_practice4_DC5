import MessageModel from '../models/messages.model.js';
class MessagesDAO {
  async getAllMessagesDao() {
    try {
      const menssages = await MessageModel.find({});
      return menssages;
    } catch (error) {
      logger.error(error);
    }
  }

  async addMessageDao(message) {
    try {
      const newMessage = await MessageModel.create(message);
      return newMessage;
    } catch (error) {
      logger.error(error);
    }
  }
}

export default MessagesDAO;
