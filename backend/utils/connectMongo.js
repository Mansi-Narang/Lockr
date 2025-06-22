import mongoose from 'mongoose'

async function connectMongo(){
    await mongoose.connect(process.env.MONGO_URL);
}

export default connectMongo;