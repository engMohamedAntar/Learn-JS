//userModel.js
const mongoose= require('mongoose');
const bcrypt= require('bcrypt');

const userSchema= mongoose.Schema(
{
    name:{
        type: String,
        required:[true, "name is required"],
        trim:true
    },
    slug:{
        type: String,
        lowerCase:true,
    },
    email:{
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowerCase: true
    },
    password:{
        type: String,
        required:[true, "password is required"],
        minLength:[6, "Too short password"]
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    active:{
        type:Boolean,
        default:true
    },
    profileImage:String,
    phone: String
},
{Timestamp:true}
);

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next(); //?
    this.password = await bcrypt.hash(this.password, 12); //?
    next();
});



module.exports= mongoose.model('User',userSchema);




//notices
// The keyword this refers to the document that is about to be saved.
// In other words, this refers to the instance of the User model on which the save operation is being performed.