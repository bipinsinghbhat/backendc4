const express=require("express")
const {UserModel}=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const userRouter=express.Router()


userRouter.post("/register",async(req,res)=>{
    const {name,email, password,gender,age,city,is_married}=req.body
  

        try {
            bcrypt.hash(password,5,async(err,hash)=>{
             if(err){
                 res.json({error:err.message})
             }else{
                 const user=new UserModel({name,email,password:hash,gender,age,city,is_married})
                 await user.save()
             }
            }) 
            res.json({msg:"user has been registered",user:req.body})
         } 
         catch (error) {
             res.json({error:error.message})
         }
     




})



userRouter.post("/login",async(req,res)=>{
   const {email,password}=req.body
   try {
      const user=await UserModel.findOne({email})
       if(user){
        bcrypt.compare(pass,user.pass,(err,result)=>{
            if(result){
                let token=jwt.sign({userID:user._id,user:user.name},"masai")
                res.json({msg:"logged in",token})
            }
            else{
                res.json({msg:"wrong credentials"})
            }
        })
       }else{
        res.json({msg:"user does not exist"})
       }
   } catch (error) {
    res.json({error:err.message})
   }
})



userRouter.get("/logout",(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1]
    
    try {
      blacklist.push(token)
      res.status(200).json({msg:"User has been logged out"})
    } catch (error) {
      res.status(400).json({error:err.message})
    }
    })




module.exports={
    userRouter
}