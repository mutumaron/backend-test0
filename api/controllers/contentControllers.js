const Blog = require('../../models/blog');
const Deal = require('../../models/deals');

exports.getDeals = async (req,res,next) => {
    try{
        const deals = await Deal.findAll();

        res.status(201).json({
            message:"Fetched Deals succesfully",
            deals:deals,
        })
    } catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }
}


exports.getBlogs = async (req,res,next) => {
    try{
        const blogs = await Blog.findAll();

        res.status(201).json({
            message:"Fetched Blogs succesfully",
            blogs:blogs
        })
    } catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }
}




exports.getDeal = async (req,res,next) => {
    const dealId = req.params.dealId;
    
    try{
      const deal = await Deal.findByPk(dealId);
      if(!deal){
        const error = new Error('Deal Not Found');
        error.statusCode = 404;
        throw error;
      }
      res.status(201).json({
        message:'Fetch deal succesfully',
        deal:deal
      })
  
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

  exports.getBlog = async (req,res,next) => {
    const blogId = req.params.blogId;
    try{
      const blog = await Blog.findByPk(blogId);
      if(!blog){
        const error = new Error('Blog Not Found');
        error.statusCode = 404;
        throw error;
      }
      res.status(201).json({
        message:'Fetch deal succesfully',
        blog:blog
      })
  
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };


  //cart controllers

exports.getToken = (req,res,next) => {
  const csrfToken = res.locals.csrfToken;

  try{
    res.status(201).json({
      message:'Fetched Token Succesfully',
      token:csrfToken,
    })
  }catch(err){
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}