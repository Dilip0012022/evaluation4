const jwt=require("jsonwebtoken")

const auth=async(req,res,next)=>{
    const token=req.headers("token")
    if(!token){
        res.status(400).json({message:"No token provided"})
    }
    try{
        let decoded=jwt.verify(token,process.env.secret)
        req.userId=decoded.userId
        next()
    }catch(err){
        res.status(400).json({message:"error"})
    }
}

module.exports={auth}