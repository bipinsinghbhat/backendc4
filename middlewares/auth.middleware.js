
const jwt=require("jsonwebtoken")
const {blacklist}=require("../blacklist")

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]

   if(token){

    if(blacklist.includes(token)){
        res.json({msg:"please login again"})
    }



    try {
     const decoded=jwt.verify(token,"masai")
     if(decoded){
        req.body.userID=decoded.userID
        req.body.user=decoded.user
        console.log(decoded)
        next()
     }  else{
        res.json({msg:"Not Authorized"})
     } 
    } catch (error) {
        res.json({error:error.message})
    }
   }else{
    res.json({msg:"Please Login!!"})
   }

}


module.exports={
   auth
}