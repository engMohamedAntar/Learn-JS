const mongoose= require('mongoose');

//create database schema
const categorySchema= new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true,'Category required'],
            unique: [true,'Category must be unique'],
            minlength :[3,'Too short category name'],
            maxlength:[32, 'Too long category name']
        },
        slug:{  //replace each space to - and every uppercase letter to a lowercase one
            type: String,
            lowercase: true 
        },
        image: String
    }, 
    {timestamps: true} 
);

//create model
const CategoryModel= mongoose.model('Category',categorySchema);

module.exports= CategoryModel;