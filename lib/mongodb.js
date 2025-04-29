import mongoose, {mongo} from "mongoose";

export const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected tto MongoDB");
    } catch (error){
        console.log("Error connect mongodb", error)
    }
}