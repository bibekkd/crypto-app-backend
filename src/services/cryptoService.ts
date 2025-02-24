import axios from 'axios';
import CryptoPrice from '../models/cryptoPrice';

const fetchAndStoreCryptoPrices = async (): Promise<void> => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
            ids: `bitcoin,solana,ethereum,matic-network,binancecoin,ripple,tether,dogecoin
            cardano,chainlink,sui,shiba-inu`,
            vs_currencies: 'inr',
        },
        });

        const prices = response.data;

        const coinMapping: { [key: string]: string } = {
            bitcoin: 'BTC',
            solana: 'SOL',
            ethereum: 'ETH',
            'matic-network': 'MATIC',
            binancecoin: 'BNB',
            ripple: 'XRP',
            tether: 'USDT',
            dogecoin: 'DOGE',
            'shiba-inu': 'SHIB',
            sui : 'SUI',
            cardano : 'ADA',
            chainlink : 'LINK'
        };

        for (const [coinId, priceData] of Object.entries(prices)) {
        const symbol = coinMapping[coinId];
        const price_inr = (priceData as { inr: number }).inr;

        if (symbol && price_inr) {
            await CryptoPrice.findOneAndUpdate(
            { symbol },
            { price_inr, last_updated: new Date() },
            { upsert: true, new: true },
            );

            console.log(`Updated price for ${symbol}: ${price_inr} INR`);
        }
        }

        console.log('All prices updated in MongoDB');
    } catch (error) {
        console.error('Error fetching or storing crypto prices:', (error as Error).message);
    }
};

export { fetchAndStoreCryptoPrices };