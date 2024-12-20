import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'user'] },
    localId: { type: mongoose.Schema.Types.ObjectId, ref: 'Local', required: true },
    creadoEn: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
export default User;
