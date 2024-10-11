//handlersFactory.js
const asyncHandler= require('express-async-handler');
const slugify= require('slugify');
const ApiError= require('../utils/ApiError');
const ApiFeatures= require('../utils/apiFeatures');


exports.deleteOne= (Model)=>
asyncHandler(async(req,res,next)=>{
    const {id}= req.params;
    const document= await Model.findOneAndDelete( //or findByIdAndDelet(id)
        {_id:id}
    );
    if(!document){
        return next(new ApiError(`No document found for this id ${id}`,400)) ;
    }
    res.status(204).send();
})

exports.updateOne = (Model)=>
    asyncHandler(async (req,res,next)=>{

        const document= await Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}  // return the updated document not the old one
        );
        if(!document){
            return next(new ApiError(`No document found for this id ${req.params.id}`,400)) ;
        }
        res.status(200).json({data: document});
    });

exports.createOne= (Model)=>
    asyncHandler( async(req,res)=>{
    //i have moved adding the slug value from validators to here because of an unknown problem
     /* if(req.body.name)
            req.body.slug= slugify(req.body.name);
        else if(req.body.title)
            req.body.slug= slugify(req.body.title);
     */   
        const document= await Model.create(req.body);
        res.status(201).json({data: document});
    });  

exports.getOne= (Model)=>
    asyncHandler(async(req,res,next)=>{
        const {id}= req.params;
        const document=await Model.findById(id);
        if(!document)
            return next(new ApiError("No document found for this id", 404));
        res.status(200).json({data: document});
    });

exports.getAll= (Model,modelName='')=>
    asyncHandler( async (req,res)=>{  
        let filterObj= {}; 
        if(req.filterObj)
            filterObj= req.filterObj;

        const documentsCount= await Model.countDocuments();
        const apiFeatures= new ApiFeatures(Model.find(filterObj), req.query)
        .paginate(documentsCount).filter().search(modelName).limitFields().sort();
        
        const {mongooseQuery, paginationResult}= apiFeatures;
        const documents= await mongooseQuery;
        res.status(200).json({results: documents.length,paginationResult, data: documents});
    });

//notices
// filterObj --> when getSubCategories is called we may need to a get subCategory of a specific
// category so we need first to check wheather we have a categoryId in the req.query object