import mongoose, { connect } from 'mongoose';

const connectDB = (url) => {
    mongoose.set('strictQuery', true); //used for working with search functionality

    mongoose.connect(url)
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.error('MongoDB connection error:', err));
}

export default connectDB;