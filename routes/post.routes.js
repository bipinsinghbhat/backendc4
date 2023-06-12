const express=require("express")

const {PostModel}=require("../models/post.model")

const {auth}=require("../middlewares/auth.middleware")





const postRouter=express.Router()

postRouter.use(auth)

postRouter.post("/add",async(req,res)=>{
try {
    const post=new PostModel(req.body)
    await post.save()
    res.json({msg:"new post has been added",post:req.body})
} catch (error) {
    res.json({error:error.message})
}
})


postRouter.get("/",async(req,res)=>{
    
    try {
     const posts=await PostModel.find({userID:req.body.userID})
     res.json(posts)
    } catch (error) {
        res.json({error:error.message})
    }


})


postRouter.patch("/update/:postID",async(req,res)=>{
   //userID in the user doc===userID in the post doc
   const userIDinUserDoc=req.body.userID

   const {postID}=req.params
   console.log("postID",postID)

try {
    const post=await PostModel.findOne({_id:postID}) 
    console.log("post",post)
    const userIDinpostsDoc=post.userID  

console.log("userIDinUserDoc",userIDinUserDoc,"userIDinpostsDoc",userIDinpostsDoc)
    if(userIDinUserDoc===userIDinpostsDoc){
     
//update
await PostModel.findByIdAndUpdate({_id:postID},req.body)
res.json({msg:`${post.title} has been updated`})


    }else{
        res.json({msg:"NOt Authorized"})
    }
 

} catch (error) {
    res.json({error:error})
}


 


})


postRouter.delete("/delete/:postID",async(req,res)=>{
    

    const userIDinUserDoc=req.body.userID

    const {postID}=req.params
    console.log("postID",postID)
 
 try {
     const post=await PostModel.findOne({_id:postID}) 
     console.log("post",post)
     const userIDinpostsDoc=post.userID  
 
 console.log("userIDinUserDoc",userIDinUserDoc,"userIDinpostsDoc",userIDinpostsDoc)
     if(userIDinUserDoc===userIDinpostsDoc){
      
 //update
 await PostModel.findByIdAndDelete({_id:postID})
 res.json({msg:`${post.title} has been deleted`})
 
 
     }else{
         res.json({msg:"NOt Authorized"})
     }
  
 
 } catch (error) {
     res.json({error:error})
 }



})


module.exports={
    postRouter
}
