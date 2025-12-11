import mongoose from "mongoose";

import { DB_URI,NODE_ENV } from "../config/env.js";


if(!DB_URI){
    throw new Error("DB_URI is not defined in environment variables");
}

export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI)
        console.log(`DB connection is established in ${NODE_ENV} mode`);
        
    } catch (error) {
        console.error("DB connection failed:", error);
        process.exit(1);
        
    }
}