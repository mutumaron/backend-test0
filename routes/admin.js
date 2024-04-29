const express = require("express");

const adminController = require("../controllers/adminController");

const router = express.Router();

router.get("/add-content",adminController.getAddContent);
router.get("/add-blog",adminController.getAddBlog);

router.get("/edit-deal/:dealId", adminController.getEditDeal);
router.post("/edit-deal", adminController.postEditDeal);
router.get("/edit-blog/:blogId",adminController.getEditBlog);
router.post("/edit-blog", adminController.postEditBlog);


router.post("/deal/add-deal", adminController.postAddDeal);
router.post("/blog/add-blog", adminController.postAddBlog);

router.post("/delete-deal",  adminController.postDeleteDeal);
router.post("/delete-blog",  adminController.postDeleteBlog);

module.exports = router;
