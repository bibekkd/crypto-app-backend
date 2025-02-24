import mongoose, { Document, Schema } from 'mongoose';

interface ICryptoPrice extends Document {
    symbol: string;
    price_inr: number;
    last_updated: Date;
}

const cryptoSchema: Schema = new mongoose.Schema({
    symbol: { type: String, required: true, unique: true },
    price_inr: { type: Number, required: true },
    last_updated: { type: Date, default: Date.now },
});

const CryptoPrice = mongoose.model<ICryptoPrice>('CryptoPrice', cryptoSchema);

export default CryptoPrice;