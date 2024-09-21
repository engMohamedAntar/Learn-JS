//brandService.js
const slugify= require('slugify');
const asyncHandler= require('express-async-handler');
const BrandModel= require('../models/brandModel');
const ApiError= require('../utils/ApiError');

exports.getBrands= asyncHandler( async (req,res)=>{     //asyncHandler passes the error to next() and as you know errors passed to next are handles using global error handler
    console.log(`req.query: `,req.query);
    
    const page= +req.query.page|| 1;
    const limit= +req.query.limit|| 5; 
    const skip= (page-1)* limit;

    const brands= await BrandModel.find({}).skip(skip).limit(limit);
    res.status(200).send({results: brands.length, page, data: brands});
});

exports.getBrand= asyncHandler(async (req,res,next)=>{
    console.log("req.params: ",req.params);
    
    const {id}= req.params;
    const brand= await BrandModel.findById(id);
    if(!brand){
        // res.status(404).json({msg: `No brand found for this id ${id}`});
        return next(new ApiError(`No brand found for this id ${id}`,400)) ;
    }
    res.status(200).json({data: brand});
});

exports.createBrand= asyncHandler( async(req,res)=>{
    const {name}= req.body;
    const brand= await BrandModel.create({name, slug:slugify(name)});
    res.status(201).json({data: brand});
});

exports.updateBrand= asyncHandler(async (req,res,next)=>{ 
    const {id}= req.params;
    const {name}= req.body;
    const brand= await BrandModel.findOneAndUpdate(
        {_id:id},
        {name, slug: slugify(name)},
        {new:true}  // return the updated brand not the old one
    );
    if(!brand){
        return next(new ApiError(`No brand found for this id ${id}`,400)) ;
    }
    res.status(200).json({data: brand});
});

exports.deleteBrand= asyncHandler(async(req,res,next)=>{
    const {id}= req.params;
    const brand= await BrandModel.findOneAndDelete( //or findByIdAndDelet(id)
        {_id:id}
    );
    if(!brand){
        return next(new ApiError(`No brand found for this id ${id}`,400)) ;
    }
    res.status(204).send();
});
