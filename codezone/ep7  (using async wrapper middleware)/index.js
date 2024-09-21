require("dotenv").config();
const express = require("express");
const app = express();
const httpStatusText= require("./utils/httpStatusText");
const cors= require('cors');

const mongoose = require("mongoose");
const uri =process.env.MONGO_URL;
mongoose.connect(uri).then(() => {
  console.log("Mongodb connected successfully");
});

app.use(express.json());

app.use(cors()); 

const coursesRouter = require("./routes/courses_routes");
app.use("/api/courses/", coursesRouter); 

//handle the routes that don't exist
app.all("*",(req,res)=>{
  res.status(404).json({status:httpStatusText.ERROR, message:"this course isn't available"});
})

//This middleware function is only called when an error is passed to the next function in any preceding middleware
//like what is happening in the asyncWrapper
app.use((error, req, res, next)=>{ //error is the error object passed to the next function
  res.status(error.statusCode|| 500).json({status:error.statusText|| httpStatusText.ERROR, message: error.message, code: error.statusCode||500, data: null});
})
 

app.listen(process.env.PORT || 5000, () => {
  console.log("listing to port 5000");
});