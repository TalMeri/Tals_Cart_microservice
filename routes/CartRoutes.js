const express = require("express");
const {
    getAllCarts,
    createCart,
    getCartbyId,
    updateCart,
    deleteCart,
    emptyCart,
    emptyCartForOrder,
    deleteCartByUserId,
    getCartbyUserId
} = require("../controllers/CartController");

const router = express.Router();

router.route("/").get(getAllCarts).post(createCart);
router.route("/:id").get(getCartbyId).delete(deleteCart);
router.route("/empty/:userid").put(emptyCart);
router.route("/order/:userid").put(emptyCartForOrder);
router.route("/user/:userid").delete(deleteCartByUserId).put(updateCart).get(getCartbyUserId);

module.exports = router;
