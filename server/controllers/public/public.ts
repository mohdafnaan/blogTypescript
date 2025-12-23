import express from "express"
import { Request,Response ,Router } from "express"

import bcrypt from "bcrypt"
import { hash,compare } from "bcrypt"
import jwt from "jsonwebtoken"
import "../../Models/Blog/Blog"
import userModel from "../../Models/User/User"


const router : Router = express.Router()

router.post("/register",async (req:Request,res:Response) :Promise<void>=>{
    try {
        let {fullName,email,password,phone} = req.body;

        if(!fullName || !email ||!password||!phone){
        res.status(400).json({msg : "fill all the fields to registrer"})
        return
        }
        let dupuser = await userModel.findOne({email,phone})
        if(dupuser){
            res.status(400).json({msg : "user already exist"})
            return
        }

        let bPass :string = await hash(password,10)  

        let userObj = {
            fullName,
            email,
            password : bPass,
            phone
        }
        
        await userModel.insertOne(userObj)

        res.status(200).json({msg : "user registered sucessfully"})

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.post("/login",async (req:Request,res:Response) :Promise<void>=>{
    try {
        let {email,password} = req.body;

        let user = await userModel.findOne({email})

        if( !email ||!password){
        res.status(400).json({msg : "fill all the fields to registrer"})
        return
        }
        
        if(!user){
            res.status(400).json({msg : "user not found"})
            return
        }
        let bPass = await bcrypt.compare(password,'user.password')

        if(!bPass){
            res.status(400).json({msg : "invalid creds"})
            return
        }
        let tokenObj = {
            email,
            _id : 'user._id'
        }
        const sec : string = String(process.env.JWT_SECRET)

        let token : string = await jwt.sign(tokenObj,sec,{expiresIn:'1D'})

        res.status(200).json({msg : "login sucessfull",token})

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

export default router
