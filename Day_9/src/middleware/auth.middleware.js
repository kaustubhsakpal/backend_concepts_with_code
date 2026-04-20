import jwt from 'jsonwebtoken'
import redis from '../config/cache';


export async function authmiddleware(req,res,next) {
    
    const token = req.cookies.logintoken;

    if(!token){
        return res.status(401).json({
            message:"unauthorized person"
        })
    }
      const data =redis.get(token);
      if(data){
        return res.status(401).json({
          message:"blaclisted authorized"
        })
      }
 let decode = null
  try{  
     decode =  await jwt.verify(token,process.env.JWT_SECRET_KEY)
}catch(err){
    console.log(err);
    
}

    console.log(decode);

    req.user=decode

    next()
    
}