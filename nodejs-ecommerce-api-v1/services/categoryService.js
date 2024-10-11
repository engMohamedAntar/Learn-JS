//categoryService.js
const sharp= require('sharp');
const multer= require('multer');
const { v4: uuidv4 } = require('uuid');         //?
const asyncHandler= require('express-async-handler');
const CategoryModel= require('../models/categoryModel');
const factory= require('./handlersFactory');
const {uploadSingleImage}= require('../middlewares/uploadimageMiddleware');

//upload single image
exports.uploadCategoryImage= uploadSingleImage('image');  //?

//Image processing
exports.resizeImage= asyncHandler( async(req,res,next)=>{  //?
    console.log(req.file);
    
    const fileName= `category-${uuidv4()}-${Date.now()}.jpeg`;
    if(req.file)
    {
        await sharp(req.file.buffer)
        .resize(400,400)
        .toFormat('jpeg')
        .jpeg({quality: 90})
        .toFile(`uploads/categories/${fileName}`);

        req.body.image= fileName; //? 
    }
    next();
});

exports.getCategories= factory.getAll(CategoryModel);

exports.getCategory= factory.getOne(CategoryModel);

exports.createCategory= factory.createOne(CategoryModel);

exports.updateCategory= factory.updateOne(CategoryModel);

exports.deletCategory= factory.deleteOne(CategoryModel);


//notices
//resizeImage -> this middleware used in categoryRoute after uploadCategoryImage
//uploadCategoryImage -> we use the uploadCategoryImage in the categoryRouter
//req.body.image= fileName; -> save image to data base (req.body is passed to the Model.create in the createOne function)
//uuidv4 -> creates a random id