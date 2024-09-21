const mongoose = require("mongoose");

//create the mongoose schema
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// combine the schema into a model, and export this model
module.exports = mongoose.model("courses", courseSchema); //courses is the name of the collection
