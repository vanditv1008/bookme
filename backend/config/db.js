import mongoose from "mongoose";
export const connectDB =async () =>{
    await mongoose.connect("mongodb+srv://vijayvandit101_db_user:6AR3LRHhIs5ryGgN@cluster0.993tvsz.mongodb.net/bokme")
    .then(() =>{
        console.log("DB started");
    });
}