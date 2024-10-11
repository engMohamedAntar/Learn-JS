//productModel.js
const mongoose= require('mongoose');
const productSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique: [true,'Product must be unique'],
        trim: true,
        minLength: [3,'Too short pruduct title'],
        maxLength:[100, 'Too long product title']
    },
    slug:{
        type: String,
        required: true,
        lowerCase: true
    },
    description: {
        type: String,
        required: [true, "product discription is required"],
        minLength: [20, "Too short discription"],
    },
    quantity: {
        type: Number,
        required: [true, "product quantity is required"] 
    },
    sold:{
        type: Number,
        default: 0
    },
    price:{
        type: Number,
        required: [true,"product price is required"],
        trim: true,
        max: [200000,"Very long product price"]
    },
    priceAfterDiscount:{
        type: Number
    },
    colors:[String],
    imageCover:{
        type: String,
        required: [true, "product image cover is required"]
    },
    images:[String],
    category:{
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required:[true, "product must belong to a category"]
    },
    subcategories: [{     //each product may belong to more than a subcategory
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory"
    }],
    brand:{
        type: mongoose.Schema.ObjectId,
        ref:'brand'
    },
    ratingsAverage: {
        type: Number,
        min: [1, "rating must be between 1.0 and 5.0"],
        max: [5 , "rating must be between 1.0 and 5.0" ]
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    }
},
{timestamps:true});

//Mongoose query middleware (used to populate the category)
productSchema.pre(/^find/, function(next){ //start with 'find'
    this.populate({
        path:'category',
        select:'name -_id'
    });
    next();
});

const setImgUrl= (doc)=>{
    if(doc.imageCover)
    {
        const imgUrl= `${process.env.BaseURL}/products/${doc.imageCover}`;
        doc.imageCover= imgUrl;
    }
    
    if(doc.images)
    {
        const newImgs=[];
        doc.images.forEach((img)=>{
            const imgUrl=  `${process.env.BaseURL}/products/${img}`;
            newImgs.push(imgUrl);
        })
        doc.images= newImgs;
    }
}
productSchema.post('init',(doc)=>{
   setImgUrl(doc);
})
productSchema.post('save',(doc)=>{
   setImgUrl(doc);
})

module.exports= mongoose.model('Product', productSchema);