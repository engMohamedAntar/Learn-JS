//subCategoryService.js
const asyncHandler= require('express-async-handler');
const slugify= require('slugify');
const SubCategoryModel= require('../models/subCategoryModel');
const ApiError = require('../utils/ApiError');
const { findByIdAndUpdate } = require('../models/categoryModel');
const CategoryModel = require('../models/categoryModel');
const ApiFeatures= require('../utils/apiFeatures');
const factory= require('./handlersFactory');


//@desc     add categoryId to the body of the request in createSubCategory
exports.setCategoryIdToBody= (req,res,next)=>{
    console.log(`setCategoryIdToBody: `,req.body);
    
    if(!req.body.category)                                          // if the category isn't sent in the req.body (in case of creating a subcategory on a category)
        req.body.category= req.params.categoryId;
    next();
};

//@desc     add filterObj to the req in case of getSubCategories
// Get /api/v1/categories/:categoryId/subcategories
exports.createFilterObj= (req,res,next)=>{
    let filterObj= {};
    if(req.params.categoryId)
        filterObj= {category: req.params.categoryId};
    req.filterObj=filterObj;
    next();
};

exports.createSubCategory= factory.createOne(SubCategoryModel);

exports.getSubCategories= factory.getAll(SubCategoryModel);

exports.getSubCategory= factory.getOne(SubCategoryModel);

exports.updateSubCategory= factory.updateOne(SubCategoryModel);

exports.deleteSubCategory= factory.deleteOne(SubCategoryModel);


//notices
// .populate('category');==> will show all the info of the category
// .pupulate({path:'category' select:'name -_id'}) -->will select the name only and discard the id and other data