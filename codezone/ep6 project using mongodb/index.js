const express = require("express");
const app = express();

//use of mongoose

const mongoose = require("mongoose");
const uri =
  "mongodb+srv://aboantar852003:nodejs_123@learn-mongo-db.wocwvuu.mongodb.net/codeZone?retryWrites=true&w=majority&appName=learn-mongo-db"; // i have added 'codeZone' in the uri inorder to access the database directly.
mongoose.connect(uri).then(() => {
  console.log("Mongodb connected successfully");
});

app.use(express.json()); // or-> app.use(bodyParser.json());

const coursesRouter = require("./routes/courses_routes"); //import the router middleware
app.use("/api/courses/", coursesRouter); //use the coursesRouter middleware

app.listen(5000, () => {
  console.log("listing to port 5000");
});