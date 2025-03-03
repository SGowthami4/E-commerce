const cartService=require('../services/cartService.cjs');
const addToCart=async(req,res)=>{
    const {userId,productId,quantity}=req.body;
    try{
        const addItem=await cartService.addToCart({userId,productId,quantity});
        res.status(201).json({message:"added to cart Successfully"});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

const getCartItems=async(req,res)=>{
    const {userId}=req.params.id;
    try{
        const allCartItems=await cartService.getCartItems(parseInt({userId}));
        res.status(200).json({"CartItems":allCartItems})
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
const removeFromCart=async(req,res)=>{
    const {userId,productId}=req.body;
    try{
        const deleteCartItem=await cartService.removeFromCart({userId,productId});
        res.status(200).json({message:"successfully removed from cart"});
    }catch(error){
        res.status(500).json({error:error.message})
    }
};
module.exports={
    addToCart,
    getCartItems,
    removeFromCart
};
