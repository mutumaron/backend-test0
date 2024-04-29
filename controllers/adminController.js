const Deal = require("../models/deals");
const Blog = require("../models/blog");
const { Result } = require("express-validator");
const path = require("path");
const fileHelper = require('../utils/file');

exports.getAddContent = (req, res, next) => {
  res.render("admin/edit-deal", {
    path: "/admin/add-content",
    pageTitle: "Add Content",
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.getEditDeal = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/deal');
  }
  const dealId = req.params.dealId;
  Deal.findByPk(dealId)
    .then((deal) => {
      if (!deal) {
        return res.redirect('/deal');
      }
      res.render('admin/edit-deal', {
        pageTitle: 'Edit Deal',
        path: '/admin/edit-deal',
        editing: editMode,
        isAuthenticated: req.session.isLoggedIn,
        deal: deal
      });
    })
    .catch((err) => {
      console.log(err);
      next(err); // Pass the error to the error handling middleware
    });
};



exports.getEditBlog = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/blog');
  }
  const blogId = req.params.blogId;
  Blog.findByPk(blogId)
    .then((blog) => {
      if (!blog) {
        return res.redirect('/blog');
      }
      res.render('admin/edit-blog', {
        pageTitle: 'Edit Blog',
        path: '/admin/edit-blog',
        editing: editMode,
        isAuthenticated: req.session.isLoggedIn,
        blog: blog
      });
    })
    .catch((err) => {
      console.log(err);
      next(err); // Pass the error to the error handling middleware
    });
};




exports.postEditDeal = async (req,res,next) => {
  try{
    const dealId = req.body.dealId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const image = req.file;
    const updatedCategory = req.body.category;



    const deal = await Deal.findByPk(dealId);
    
    if(!deal){
      return res.status(404).json({error:'Deal not found'});
    }
    deal.title = updatedTitle;
    deal.price = updatedPrice;
    deal.category = updatedCategory;
    deal.description = updatedDescription

    if(image){
      fileHelper.deleteFile(deal.image);
      deal.image = image.path;
    }

    const updatedDeal = await deal.save();
    res.redirect('/deal');
  }catch(err) {
    console.log(err);
    next(err);
  }
};


exports.getAddBlog = (req, res, next) => {
  res.render("admin/edit-blog", {
    path: "/admin/add-blog",
    pageTitle: "Add Blog",
    editing: false,
    isAuthenticated: req.session.isLoggedIn,
  });
};








exports.postAddDeal = async (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const image = req.file;
  const category = req.body.category;
  const description = req.body.description;

  const imageUrl = image.path;

  Deal.create({
    title: title,
    price: price,
    image: imageUrl,
    description:description,

    category: category,
  })
    .then((result) => {
      res.redirect("/deal");
    })
    .catch((err) => console.log(err));
};



exports.postAddBlog = async (req, res, next) => {
  if (!req.file) {
    const error = new Error("No image Provided");
    error.statusCode = 422;
    throw error;
  }

  const url = req.body.url;
  const category = req.body.category;
  const title = req.body.title;
  const image = req.file;

  const imageUrl = image.path;  

  Blog.create({
    url: url,
    category: category,
    title: title,
    image: imageUrl,
  })
    .then((result) => {
      res.redirect("/blog");
    })
    .catch((err) => console.log(err));
};


exports.postEditBlog = async (req,res,next) => {
  try{
    const blogId = req.body.blogId;
    const updatedTitle = req.body.title;
    const updatedUrl = req.body.url;
    const image = req.file;
    const updatedCategory = req.body.category;



    const blog = await Blog.findByPk(blogId);
    
    if(!blog){
      return res.status(404).json({error:'Blog not found'});
    }
    blog.title = updatedTitle;
    blog.category = updatedCategory;
    blog.url = updatedUrl;

    if(image){
      fileHelper.deleteFile(blog.image);
      blog.image = image.path;
    }

    const updatedBlog = await blog.save();
    res.redirect('/blog');
  }catch(err) {
    console.log(err);
    next(err);
  }
};





exports.postDeleteDeal = async (req, res, next) => {
  try {
    const dealId = req.body.dealId;
    const deal = await Deal.findByPk(dealId);
    fileHelper.deleteFile(deal.image);
    if (!deal) {
      throw new Error("Deal not found");
    }

    await deal.destroy();
    console.log("Deal deleted successfully");
    res.redirect("/deal");
  } catch (err) {
    console.log(err);
    next(err);
  }
};


exports.postDeleteBlog = async (req, res, next) => {
  try {
    const blogId = req.body.blogId;
    const blog = await Blog.findByPk(blogId);
    fileHelper.deleteFile(blog.image);
    if (!blog) {
      throw new Error("Deal not found");
    }

    await blog.destroy();
    console.log("Blog deleted successfully");
    res.redirect("/blog");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
