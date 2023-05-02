const express=require("express")
const mongoose=require("mongoose")
const connection=require("./db")
const userRoutes=require("./routes/user.route")
const articleRoutes=require("./routes/article.route")
const app=express()
app.use(express.json())
require("dotenv").config()

app.get("/",(req,res)=>{
    res.send({"msg":"Working"})
})

app.use("/users",userRoutes)
app.use("/articles",articleRoutes)



app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log(err)
    }
    console.log(`Listening to PORT ${process.env.port}...`)
})