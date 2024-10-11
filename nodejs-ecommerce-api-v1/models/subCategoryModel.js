const mongoose= require('mongoose');

const subCategorySchema= new mongoose.Schema(
    {
        name:{
            type:String,
            unique: [true, "Name must be unique"], 
            required: [true, 'subcategory name is required'],
            trim: true, //remove spaces after and before
            minLength: [2,'Too short SubCategory name'],
            maxLength: [32,'Too long SubCategory name'],
        },
        slug:{
            type: String,
            lowercase: true,
        },
        category: {     //refers to the parent category model(Category)
            type: mongoose.Schema.ObjectId, //foreign key
            ref: 'Cateogry',
            required: [true, 'subcategory must blong to a parent category']
        }
    },
    {timestamps:true}
);


module.exports= mongoose.model('SubCategory', subCategorySchema)