const mongoose=require("mongoose")
const { UserModel } = require("./user.model")

const articleSchema=new mongoose.Schema({
    title: {type:String,required:true},
    body: {type:String,required:true},
    user: {type:mongoose.Schema.Types.name,ref:UserModel,required:true},
    userId: {type:mongoose.Schema.Types.ObjectId,ref:UserModel,required:true},
    category: {type:String,required:true},
    live: {type:Boolean,required:true},
})

const ArticleModel=mongoose.model("article",articleSchema)

module.exports={ArticleModel}