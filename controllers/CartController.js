const cartService = require("../services/CartService");

exports.getAllCarts = async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();
    res.json({ data: carts, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCart = async (req, res) => {
  try {
    const cart = await cartService.createCart(req.body);
    res.json({ data: cart, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCartbyId = async (req, res) => {
  try {
    const cart = await cartService.getCartbyId(req.params.id);
    res.json({ data: cart, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCartbyUserId = async (req, res) => {
    try {
      const cart = await cartService.getCartbyUserId(req.params.userid);
      res.json({ data: cart, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.updateCart = async (req, res) => {
  try {
    const cart = await cartService.updateCart(req.params.userid, req.body);
    res.json({ data: cart, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const cart = await cartService.deleteCart(req.params.id);
    res.json({ data: cart, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCartByUserId = async (req, res) => {
  try {
    const cart = await cartService.deleteCartByUserId(req.params.userid);
    res.json({ data: cart, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const cart = await cartService.emptyCart(req.params.userid);
    res.json({ data: cart, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.emptyCartForOrder = async (req, res) => {
  try {
    const cartItem = await cartService.emptyCartForOrder(req.params.userid);
    res.json({ data: cartItem, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
