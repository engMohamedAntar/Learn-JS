const jwt= require("jsonwebtoken");
const appError = require("../utils/appError");
const httpStatusText= require("../utils/httpStatusText");

const verifyToken= (req,res,next)=>{
    const authHeader = req.headers["Authorization"] || req.headers["authorization"];
    if(!authHeader)
    {
        const error = appError.create("Token is required",401,httpStatusText.ERROR);
        return next(error);        
    }

    
    const token= authHeader.split(' ')[1];

    try{
        const decodedToken= jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.currUser= decodedToken; //currUser variable will be use by the allowedTo function in the delete_course request
        next(); //move on to the next middleware or route handler in the stack because the request has passed the authentication check.
    }catch(err){
        const error = appError.create("invalid token",401,httpStatusText.ERROR);
        return next(error);
    }

}
module.exports= verifyToken;