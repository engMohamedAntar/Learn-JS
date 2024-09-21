const User= require("../models/user_model");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper= require("../middleWares/asyncWrapper");
const appError= require("../utils/appError");
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");
const generateJWT= require("../utils/generateJWT");

const getAllUsers=async (req,res)=>{
    const query= req.query;

    const limit= query.limit || 10;
    const page= query.page || 1;
    const skip = (page-1)* limit;

    const users= await User.find({},{"__v":false, "password":false}).limit(limit).skip(skip);
    
    res.json({status: httpStatusText.SUCCESS, data:{users} });
}


const register= asyncWrapper( async(req,res,next)=>{
    const {firstName,lastName,email,password,role} = req.body;    // avatar is not in req.body but in req.file

    
    
    const oldUser= await User.findOne({email:email});
    if(oldUser)
    {
        const error= appError.create("This email already exists",400,httpStatusText.ERROR);
        return next(error);
    }

    //password hashing
    const hashedPassword= await bcrypt.hash(password,10);   //10 is a salt which is a random string added to your password
    const newUser= new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            avatar: req.file.filename   // file would be undefined if you didn't send a file in the form-data in postman
        })
    

    

    //generate jwt token
    const token= await generateJWT({email:newUser.email, id:newUser._id, role:newUser.role});   //we have added role variable to the payload to be able to impliment the allowedTo function
    newUser.token= token;
    await newUser.save();

    res.status(200).json({status: httpStatusText.SUCCESS, data:{user: newUser} });
})


const login= asyncWrapper(async(req,res,next)=>{
    const {email, password}= req.body;

    const user= await User.findOne({email:email});
    if(!user){
        const error= appError.create("User not found",400,httpStatusText.FAIL);
        return next(error);
    }
    const matchedPass= await bcrypt.compare(password , user.password);

    if(matchedPass){
        //create jwt token
        const token= await generateJWT({email:user.email, id:user._id, role:user.role});
        return res.json({status:httpStatusText.SUCCESS, data:{token}});
    }
    else{
        const error= appError.create("Password is wrong",400,httpStatusText.FAIL);
        return next(error);
    }
})


module.exports= {
    getAllUsers,
    register,
    login
}

