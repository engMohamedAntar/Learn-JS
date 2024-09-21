const express= require("express");
const router = express.Router();
const verifyToken= require("../middleWares/verifyToken");
const usersController= require("../controllers/users-controllers");

const multer= require('multer');
const appError = require("../utils/appError");

// diskstorage defines the storage settings like the storage distination and the name of the files uploaded
const diskStorage= multer.diskStorage({         // control how files are stored on disk.
    destination: function (req,file,cb) {       // specifies the directory where the uploaded files will be stored.
        // console.log("FILE:",file);              // contains information about the uploaded file.
        cb(null,'uploads');                     // It tells Multer where to store the uploaded files.
    },
    filename: function(req,file,cb) {           // determines the name under which the file will be saved.
        const extention= file.mimetype.split("/")[1];
        const fileName= `user-${Date.now()}.${extention}`;
        cb(null,fileName);                      //It tells Multer what filename to use when saving the file.
    }
})

//file filter is a property that we pass to multer inorder to determine which kind of files could be uploaded.
const fileFilter= (req,file,cb)=>{
    
    const fileType= file.mimetype.split('/')[0];
    if(fileType==='image')
        return cb(null,true);                    //It tells Multer whether to accept or reject the file based on custom filtering logic (true means that the file passes the filter and should be accepted.)
    else
        return cb(appError.create('file must be an image',400), false);
}

const upload= multer({
    storage: diskStorage,
    fileFilter: fileFilter
});

router.route("/")
    .get(verifyToken,usersController.getAllUsers)
router.route("/register")
    .post(upload.single('avatar'), usersController.register)  //The .single() method tells Multer to expect a single file upload from the form field with the name 'avatar'.
router.route("/login")
    .post(usersController.login);

module.exports= router;


