//categoryService.js
const slugify= require('slugify');
const asyncHandler= require('express-async-handler');
const CategoryModel= require('../models/categoryModel');
const ApiError= require('../utils/ApiError');

exports.getCategories= asyncHandler( async (req,res)=>{     //asyncHandler passes the error to next() and as you know errors passed to next are handles using global error handler
    console.log(`req.query: `,req.query);
    
    const page= +req.query.page|| 1;
    const limit= +req.query.limit|| 5; 
    const skip= (page-1)* limit;

    const categories= await CategoryModel.find({}).skip(skip).limit(limit);
    res.status(200).send({results: categories.length,page, data: categories});
});

exports.getCategory= asyncHandler(async (req,res,next)=>{
    console.log("req.params: ",req.params);
    
    const {id}= req.params;
    const category= await CategoryModel.findById(id);
    if(!category){
        // res.status(404).json({msg: `No category found for this id ${id}`});
        return next(new ApiError(`No category found for this id ${id}`,400)) ;
    }
    res.status(200).json({data: category});
});

exports.createCategory= asyncHandler( async(req,res)=>{
    const {name}= req.body;
    const category= await CategoryModel.create({name, slug:slugify(name)});
    res.status(201).json({data: category});
});

exports.updateCategory= asyncHandler(async (req,res,next)=>{ 
    const {id}= req.params;
    const {name}= req.body;
    const category= await CategoryModel.findOneAndUpdate(
        {_id:id},
        {name, slug: slugify(name)},
        {new:true}  // return the updated category not the old one
    );
    if(!category){
        return next(new ApiError(`No category found for this id ${id}`,400)) ;
    }
    res.status(200).json({data: category});
});

exports.deletCategory= asyncHandler(async(req,res,next)=>{
    const {id}= req.params;
    const category= await CategoryModel.findOneAndDelete( //or findByIdAndDelet(id)
        {_id:id}
    );
    if(!category){
        return next(new ApiError(`No category found for this id ${id}`,400)) ;
    }
    res.status(204).send();
});
