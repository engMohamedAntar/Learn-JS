const appError = require("../utils/appError");

module.exports=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.currUser.role)) //if roles doesn't contain the CurrUser role
        {
            return next(appError.create("Current user role isn't authorized",401));
        }
        next();
    }
}