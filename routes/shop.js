const path = require("path");

const express = require("express");

const shopController = require("../controllers/shopController");

const router = express.Router();


router.get("/orders", shopController.getOrders);
router.post("/order-delete-item",shopController.deleteOrder);

module.exports = router;
