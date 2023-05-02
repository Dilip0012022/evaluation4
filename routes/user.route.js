const express=require("express")
const UserModel=require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    try{
        const {name,email,pass,city,age}=req.body
        const user=await UserModel.findOne({email})
        if(user){
            res.status(200).json({message:"User already exists, please login"})
        }
        const hashed=await bcrypt.hash(pass,5)
        const newuser=await UserModel.create({name,email,pass:hashed,city,age})
        res.status(200).json(newuser)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    try{
        const {email,pass}=req.body
        const user=await UserModel.find({email})
        if(!user){
            res.status(200).json({"message":"User is not present"})
        }
        const check=await bcrypt.compare(pass,user[0].pass)
        if(!check){
            res.status(200).json({"message":"Invalid Credentials"})
        }
        const token=jwt.sign({userId:user[0]._id},process.env.secret)
        res.status(200).json({email,token})
    }catch(err){
        res.status(400).json({"message":"Error"})
    }
})


module.exports=userRouter