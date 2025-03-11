const wishlistServices=require('../services/wishlistServices.cjs');
const addToWishList=async(req,res)=>{
    const {userId,productId}=req.body;
    try{
        const addItem=await cartService.addToWishList({userId,productId});
        res.status(201).json({message:"added to wishList Successfully"});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

const getWishListItems=async(req,res)=>{
    const {userId}=req.params.id;
    try{
        const getWishListItems=await wishlistServices.getWishListItems(parseInt({userId}));
        res.status(200).json({"WishListitems":getWishListItems})
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
const removeWishListItem=async(req,res)=>{
    const {userId,productId}=req.body;
    try{
        const deletewishListItem=await wishlistServices.removeWishListItem({userId,productId});
        res.status(200).json({message:"successfully removed from wishList"});
    }catch(error){
        res.status(500).json({error:error.message})
    }
};
module.exports={
    addToWishList,
    getWishListItems,
    removeWishListItem
};
