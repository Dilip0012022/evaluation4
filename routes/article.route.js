const express=require("express")
const ArticleModel=require("../model/article.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const auth=require("../middlewares/auth.mw")
const { ArticleModel } = require("../model/article.model")
const articleRouter=express.Router()

articleRouter.get("/",auth,async(req,res)=>{
    res.send("done")
})
articleRouter.post("/add",auth,async(req,res)=>{
    try{
        let {title,body,category,live}=req.body
        const obj={
            title,
            body,
            user:req.user,
            userId:req.userId,
            category,
            live
        }
        const newpost=await ArticleModel.create(obj)
        res.status(200).json({newpost})
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

articleRouter.patch("/edit/:id",auth,async(req,res)=>{
    try{
        const article=await ArticleModel.findById(req.params.id)
        if(!article){
            res.status(200).json({"message":"Article not found"})
        }
        const update=await ArticleModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(update)
    }catch(err){
        res.status(400).json({message:"error"})
    }
})

articleRouter.delete("/rem/:id",auth,async(req,res)=>{
    try{
        const article=await ArticleModel.findById(req.params.id)
        if(!article){
            res.status(200).json({"message":"Article not found"})
        }
        if(article.userId.toString()!=req.userId){
            res.status(200).json({message:"Not Authorised"})
        }
        const deleted=await ArticleModel.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted")
    }catch(err){
        res.status(400).json({message:"error"})
    }
})


module.exports=articleRouter