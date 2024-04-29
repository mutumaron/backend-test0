const Order = require('../../models/Oders');

exports.postOrder = async (req,res,next) => {
    const { user, orderedItems } = req.body;

    console.log(orderedItems);
    try{
        const newOrder = await Order.create({
            user:user,
            orderedItems:orderedItems,
        });
        res.status(201).json({message:'Order saved Succesfully',order:newOrder})
    }catch(error){
        console.log(error);
        res.status(500).json({message:'Failed to save order',});
    }

}