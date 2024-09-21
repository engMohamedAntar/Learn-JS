//subCategoryService.js
const asyncHandler= require('express-async-handler');
const slugify= require('slugify');
const SubCategoryModel= require('../models/subCategoryModel');
const ApiError = require('../utils/ApiError');
const { findByIdAndUpdate } = require('../models/categoryModel');
const CategoryModel = require('../models/categoryModel');


//@desc     add categoryId to the body of the request
exports.setCategoryIdToBody= (req,res,next)=>{
    if(!req.body.category)                                          // if the category isn't sent in the req.body (in case of creating a subcategory on a category)
        req.body.category= req.params.categoryId;
    next();
};

//create a subCategory
exports.createSubCategory= asyncHandler(async(req,res)=>{
    const {name, category}= req.body;
    const subCategory= await SubCategoryModel.create({
        name,
        slug: slugify(name),
        category
    });
    res.status(201).json({data: subCategory});
});

//@desc create filter object to only get subcategories of a specific category
exports.createFilterObj= (req,res,next)=>{
    let filterObject={};
    if(req.params.categoryId)
        filterObject= {category: req.params.categoryId};     

    req.filterObj=filterObject; //add the filterObject to the req
    next();
}

exports.getSubCategories= asyncHandler(async (req,res)=>{
    const limit= +req.query.limit || 5;
    const page= +req.query.page || 1;
    const skip= (page-1)* limit;
    
    const subCategories= await SubCategoryModel.find(req.filterObj).skip(skip).limit(limit); // the filterObje has been added to the the req using the createFilterObj middleware
    res.status(200).json({Results: subCategories.length,page, data: subCategories});
});

exports.getSubCategory= asyncHandler(async(req,res,next)=>{
    const {id}= req.params;
    const subCategory=await SubCategoryModel.findById(id);
    if(!subCategory)
        return next(new ApiError("No subcategory found for this id", 404));
    res.status(200).json({data: subCategory});
});

exports.updateSubCategory= asyncHandler(async (req,res,next)=>{
    const {id}= req.params;
    const {name, category}= req.body;

    const subCategory= await SubCategoryModel.findOneAndUpdate(
        {_id: id},
        {name, slug: slugify(name), category},
        {new: true}
    );
    if(!subCategory)
        return next(new ApiError(`No subctegory found for this id ${id}`),404);
    res.status(200).json({data: subCategory});
});

exports.deleteSubCategory= asyncHandler( async(req,res,next)=>{
    const {id}= req.params;
    const subCategory= await SubCategoryModel.findOneAndDelete(
        {_id:id}
    );
    
    if(!subCategory)
        return next(new ApiError(`No subctegory found for this id ${id}`),404);    
    res.status(204).send();
});


//notices
// .populate('category');==> will show all the info of the category
// .pupulate({path:'category' select:'name -_id'}) -->will select the name only and discard the id and other data