import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

async function dbConnect():Promise<void> {
    try {
        const uri : string = String(process.env.DBURI)

        await mongoose.connect(uri)
        console.log(`database connected`);
    } catch (error) {
        console.log(error);
    }
}
dbConnect()