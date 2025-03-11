const express=require('express');
const router=express.Router();
const wishlistController=require('../controllers/wishlistController.cjs');

router.post('/add',wishlistController.addToWishList);
router.get('/get',wishlistController.getWishListItems);
router.put('/delete',wishlistController.removeWishListItem);

module.exports=router;