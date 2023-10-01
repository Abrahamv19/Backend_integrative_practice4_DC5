import MessageModel from '../DAO/models/messages.model.js';

class ServiceChats {
  async getChatService() {
    try {
      const allChat = await MessageModel.find({});
      return allChat;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getOneChatServiceService(id) {
    try {
      const oneChat = await MessageModel.findById(id);
      return oneChat;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createChatService(doc) {
    try {
      const newChat = await MessageModel.create(doc);
      return newChat;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateChatService(id, doc) {
    try {
      await MessageModel.findByIdAndUpdate(id, doc);
      const chatUpdated = await MessageModel.findById(id);
      return chatUpdated;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteChatService(id) {
    try {
      const deletedChat = await MessageModel.findByIdAndDelete(id);
      return deletedChat;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default ServiceChats;
