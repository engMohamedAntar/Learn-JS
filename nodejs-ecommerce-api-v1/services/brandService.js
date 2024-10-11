//brandService.js
const sharp= require('sharp');
const { v4: uuidv4 } = require('uuid');         //creates a random id

const asyncHandler= require('express-async-handler');
const BrandModel= require('../models/brandModel');
const factory= require('./handlersFactory');
const {uploadSingleImage}= require('../middlewares/uploadimageMiddleware');


//upload single image
exports.uploadBrandImage= uploadSingleImage('image');  

//Image processing
exports.resizeImage= asyncHandler( async(req,res,next)=>{
    const fileName= `brand-${uuidv4()}-${Date.now()}.jpeg`;
    if(req.file&& req.file.buffer)
    {
        await sharp(req.file.buffer)
        .resize(400,400)
        .toFormat('jpeg')
        .jpeg({quality: 90})
        .toFile(`uploads/brands/${fileName}`);
        req.body.image= fileName; // save image to data base (req.body is passed to the Model.create in the createOne function)
    }
    
    next();
});

exports.getBrands= factory.getAll(BrandModel);

exports.getBrand= factory.getOne(BrandModel);

exports.createBrand= factory.createOne(BrandModel);

exports.updateBrand= factory.updateOne(BrandModel);


exports.deleteBrand= factory.deleteOne(BrandModel);