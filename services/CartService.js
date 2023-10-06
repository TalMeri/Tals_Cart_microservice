const CartModel = require("../models/Cart");
const axios = require("axios");

exports.getAllCarts = async () => {
  return await CartModel.find();
};

exports.createCart = async (cart) => {
  if (!cart || !cart.userId) {
    throw new Error("must have userId");
  }
  const user = await axios.get(`http://localhost:3004/user/${cart.userId}`);
  if (!user) {
    throw new Error("User does not exist");
  }
  return await CartModel.create(cart);
};

exports.getCartbyId = async (id) => {
  return await CartModel.findById(id);
};

exports.getCartbyUserId = async (userId) => {
  return await CartModel.findOne({ userId: userId });
};

exports.updateCart = async (userId, item) => {
  let cart = await CartModel.findOne({ userId: userId });
  if (!cart) {
    try {
      cart = await this.createCart(userId);
    } catch (err) {
      throw new Error("error in creating cart");
    }
  }

  let nourishment = await axios.get(
    `http://localhost:3002/menu/${item.nourishmentId}`
  );
  nourishment = nourishment.data.data;
  if (!nourishment) {
    throw new Error("nourishment does not exist");
  }

  const nourishmentIndex = cart.items.findIndex(
    (existItem) => existItem.nourishmentId === item.nourishmentId
  );
  const price = parseFloat(nourishment.price);
  const itemAmount = parseInt(item.amount);
  const oldTotalPrice = parseFloat(cart.totalPrice);
  const oldTotalAmount = parseInt(cart.totalAmount);

  let newTotalPrice = 0;
  let newTotalAmount = 0;

  if (nourishmentIndex != -1) {
    const oldAmount = parseInt(cart.items[nourishmentIndex].amount);
    const newAmount = oldAmount + itemAmount;

    if (newAmount <= 0) {
      newTotalPrice = oldTotalPrice - oldAmount * price;
      newTotalAmount = oldTotalAmount - oldAmount;
      cart.items.splice(nourishmentIndex, 1);
    } else {
      cart.items[nourishmentIndex].amount = newAmount;
      newTotalPrice = oldTotalPrice + itemAmount * price;
      newTotalAmount = oldTotalAmount + itemAmount;
    }
  } else {
    cart.items.push(item);
    newTotalPrice = oldTotalPrice + itemAmount * price;
    newTotalAmount = oldTotalAmount + itemAmount;
  }
  cart.totalPrice = newTotalPrice.toFixed(3);
  cart.totalAmount = newTotalAmount;
  await cart.save();
  return cart;
};

exports.deleteCart = async (id) => {
  return await CartModel.findByIdAndDelete(id);
};

exports.deleteCartByUserId = async (userId) => {
  return await CartModel.findOneAndDelete({ userId: userId });
};

exports.emptyCart = async (id) => {
  let cart = await CartModel.findOne({ userId: id });
  if (!cart) {
    try {
      cart = await this.createCart(id);
      return cart;
    } catch (err) {
      throw new Error("error in creating cart");
    }
  }
  cart.items = [];
  cart.totalPrice = 0;
  cart.totalAmount = 0;
  cart.save();
  return cart;
};

exports.emptyCartForOrder = async (id) => {
  let cart = await CartModel.findOne({ userId: id });
  if (!cart) {
    throw new Error("no cart");
  }
  if (cart.items.length <= 0) {
    throw new Error("cart can't be empty when creating an order");
  }
  try {
    const order = await axios.post("http://localhost:3005/order/", {
        userId: id,
        items: cart.items,
        totalPrice: cart.totalPrice,
        totalAmount: cart.totalAmount,
      },);
  } catch (err) {
    throw err;
  }

  

  cart.items = [];
  cart.totalPrice = 0;
  cart.totalAmount = 0;
  cart.save();
  return cart;
};
