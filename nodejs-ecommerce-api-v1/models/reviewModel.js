const mongoose = require("mongoose");
const Product = require("./productModel");
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
      required: [true, "review ratings required"],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "review must belong to a product"],
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name" });
  next();
});

reviewSchema.statics.calcAverageRatingsAndQuantity = async function (productId) {
  const result = await this.aggregate([
    // Stage 1: get all reviews for a specific product
    {
      $match: { product: productId }, //it's like the where statement in sql
    },
    // Stage 2: Grouping reviews based on productID and calculate avgRatings and ratingsQuantity
    {
      $group: {  _id: "product", avgRatings: { $avg: "$ratings" }, ratingsQuantity: { $sum: 1 }}  //it's like the group_by in sql
    },
  ]);

  console.log(result);

  if (result.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: result[0].avgRatings,
      ratingsQuantity: result[0].ratingsQuantity,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.post("save", async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

module.exports = mongoose.model("Review", reviewSchema);
