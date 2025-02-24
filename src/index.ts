import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import cryptoRoutes from './routes/crytoRoutes';
import logger from './utils/logger';
import cron from 'cron';
import { fetchAndStoreCryptoPrices } from './services/cryptoService';
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', cryptoRoutes);

const startApp = async (): Promise<void> => {
  try {
    await connectDB();
    logger.info('Connected to MongoDB');

    await fetchAndStoreCryptoPrices();
    logger.info('Crypto prices updated successfully');

    // Schedule price updates every 5 minutes
    // const job = new cron.CronJob('*/5 * * * *', async () => {
    //   logger.info('Fetching and storing crypto prices...');
    //   await fetchAndStoreCryptoPrices();
    // });

    // job.start();
    // logger.info('Scheduled price updates every 5 minutes');

    // Start the server
    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error(`Application error: ${(error as Error).message}`);
  }
};

startApp();