import 'dotenv/config';
import { connect } from 'mongoose';
import { logger } from '../utils/logger.js';
import config from './envConfig.js';

export async function connectMongo() {
  try {
    await connect(config.mongoUrl);
    logger.info('Connected successfully to MongoDB');
  } catch (e) {
    logger.error(e);
    throw 'Can not connect to mongo';
  }
}
