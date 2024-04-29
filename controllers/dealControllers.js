const Deal = require('../models/deals');



exports.getDeals = async (req, res, next) => {

  try {
    const deals = await Deal.findAll();

    res.render('admin/index',{
      path:'/',
      pageTitle:'Deals',
      deals: deals,
      
    });

    // res.status(201).json({
    //   message: "Fetched data succesful",
    //   deals: deals,
    // });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


