import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    if (isConnected && mongoose.connection.readyState === 1) {
        return;
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("MONGODB_URI is not configured");
    }

    await mongoose.connect(uri);
    isConnected = true;
    console.log("DB connected");
};


