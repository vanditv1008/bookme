import jwt from 'jsonwebtoken'


const auth =(req,res,next)=>{
    const authHeader=req.get('Authorization');
    const bearerToken=authHeader?.match(/^Bearer\s+(\S+)$/i)?.[1];
    if(!bearerToken){
        return res.status(401).json({message:'No token provided'});
    }
    try {
        const decoded=jwt.verify(bearerToken,process.env.JWT_SECRET);
        req.user={ id:decoded.userId};
        next();
    } catch (error) {
        return res.status(401).json({message:'Invalid token'});
    }
}
export default auth;
