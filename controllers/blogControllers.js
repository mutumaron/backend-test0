const Blog = require('../models/blog');


exports.getBlogs = async (req,res,next) => {

    try{
        const blogs = await Blog.findAll();

        res.render('admin/blog',{
          path:'/',
          pageTitle:'Blogs',
          blogs: blogs,
          
        });
    
        // res.status(201).json({
        //     message:"Fetched Blog succesfuly",
        //     blogs:blogs,
        // });
    } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
};

