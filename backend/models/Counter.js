import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
    sequence: { type: Number, default: 21 }
});

const Counter = mongoose.model('Counter', counterSchema);

export default Counter;
