const express=require('express');
const router=express.Router();
const cartController=require('../controllers/cartController.cjs');

router.post('/add',cartController.addToCart);
router.get('/get/:userId',cartController.getCartItems);
router.delete('/delete/:userId/:productId',cartController.removeFromCart);

module.exports=router;