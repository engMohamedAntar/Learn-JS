const golbalError= (err,req,res,next)=>{
    err.statusCode= err.statusCode || 500;
    err.status= err.status || "error";
    if(process.env.NODE_ENV==='development')
        sendErrorForDev(res,err);
    else{
        sendErrorForProd(res,err);
    }
}

const sendErrorForDev= (res,err)=>{
        return res.status(err.statusCode).json({
        error: err,
        message: err.message,           
        stack: err.stack    
    })
};

const sendErrorForProd= (res,err)=>{
        return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,           
    })
};


module.exports= golbalError;




// notices
//built-in properties of the Error object (such as message and stack) aren't included automatically when the object is converted to JSON, so that we need to explicitly add them











