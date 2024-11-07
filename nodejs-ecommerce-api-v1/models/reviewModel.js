const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "review must belong to a user"],
    },
    ratings: {
      type: Number,
      min: [1, "min rating is 1.0"],
      max: [5, "max rating is 5.0"],
      required: [true,"review ratings required"]
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "review must belong to a product"],
    },
  },
  { timestamps: true }
);

const reviewModel= mongoose.model('Review',reviewSchema);
module.exports = reviewModel;
