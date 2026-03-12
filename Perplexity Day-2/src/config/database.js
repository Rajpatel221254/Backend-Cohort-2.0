import mongoose, { mongo } from 'mongoose'

async function connectToDB() {
    await mongoose.connect(process.env.MONGO_URI)

    console.log("Connected to DB");
}

export default connectToDB