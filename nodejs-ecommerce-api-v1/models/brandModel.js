const mongoose= require('mongoose');

//create database schema
const brandSchema= new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true,'brand required'],
            unique: [true,'brand must be unique'],
            minlength :[3,'Too short brand name'],
            maxlength:[32, 'Too long brand name']
        },
        slug:{
            type: String,
            lowercase: true 
        },
        image: String
    }, 
    {timestamps: true} 
);

module.exports= mongoose.model('brand',brandSchema);
