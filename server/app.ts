import express from "express"
import type { Application,Request,Response} from "express"
import dotenv from "dotenv"
dotenv.config()

import "./utils/dbConnect.ts"

import userRouter from "./controllers/public/public"
import middleware from "./auth/auth"
import privatUSerRouter from "./controllers/private/private"

const app : Application = express()


const port : number = Number(process.env.PORT)

app.use(express.json())

app.get("/",(req : Request,res:Response)=>{
    try {
        res.status(200).json({msg : "server is live"})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})
app.use("/pubic",userRouter)
app.use(middleware)
app.use("/private",privatUSerRouter)
app.listen(port,()=>{
    console.log(`server is running at http://localhost:5000`);
})
