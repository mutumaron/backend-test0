const Product = require("../models/deals");
const Odu = require("../models/Oders");
const fileHelper = require("../utils/file");





exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Odu.findAll();

    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders: orders,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.body.orderId;
    const order = await Odu.findByPk(orderId);
    // fileHelper.deleteFile(order.image);
    if (!order) {
      throw new Error("Order not Found");
    }
    await order.destroy();
    console.log("Order deleted succesfully");
    res.redirect("/orders");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
