const asyncHandler = require("express-async-handler");
const CartModel = require("../models/cartSchema");
const Product = require("../models/productModel");

exports.addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color, quantity } = req.body;
  const product = await Product.findById(productId);
  //check if logged user already have a cart
  let cart = await CartModel.findOne({ user: req.user._id });

  if (!cart) {
    //if no cart exist create a cart and add the product to it
    cart = await CartModel.create({
      user: req.user._id,
      cartItems: [
        { product: req.body.productId, color, quantity, price: product.price },
      ],
    });
  } else {
    //search for a cart item containing productId
    const cartIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    );

    // If the product exist before in a cart item then increment its quantity
    if (cartIndex !== -1) {
      cart.cartItems[cartIndex].quantity += +quantity;
    } else {
      // there is no cart item containing this product then push a new cart item object for this produt
      cart.cartItems.push({
        product: productId,
        color,
        quantity,
        price: product.price,
      });
    }
  }
  await cart.save();
});
