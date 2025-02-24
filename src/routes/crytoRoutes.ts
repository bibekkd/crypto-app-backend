import express from 'express';
import CryptoPrice from '../models/cryptoPrice';

const router = express.Router();

// Fetch all crypto prices
router.get('/prices', async (req, res) => {
  try {
    const prices = await CryptoPrice.find();
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prices', error: (error as Error).message });
  }
});

export default router;