import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    favorites: [Number],
})

export default mongoose.model('User', userSchema)