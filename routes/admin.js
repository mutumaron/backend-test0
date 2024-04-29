const express = require("express");

const adminController = require("../controllers/adminController");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/add-content", isAuth, adminController.getAddContent);
router.get("/add-blog", isAuth, adminController.getAddBlog);

router.get("/edit-deal/:dealId", isAuth, adminController.getEditDeal);
router.post("/edit-deal",  isAuth,adminController.postEditDeal);
router.get("/edit-blog/:blogId", isAuth, adminController.getEditBlog);
router.post("/edit-blog", isAuth, adminController.postEditBlog);


router.post("/deal/add-deal",  isAuth,adminController.postAddDeal);
router.post("/blog/add-blog",  isAuth,adminController.postAddBlog);

router.post("/delete-deal",  isAuth,adminController.postDeleteDeal);
router.post("/delete-blog",  isAuth,adminController.postDeleteBlog);

module.exports = router;
