import jwt from 'jsonwebtoken';

export const verified=async(req,res,next)=>{
    
    try {
              let token =req.header('auth');
          
              if(!token) return res.status(400).json({msg:'invalid token'});
             
              jwt.verify(token,'secretkey',(err,decoded)=>{
                    if(err) return res.status(400).json({msg:'something wrong I do not why' ,err:err})
                    req.decoded=decoded;
             
                    next()
            })
            
                  
                   

            
          } catch (error) {
            return  res.json(error)
          }


}
