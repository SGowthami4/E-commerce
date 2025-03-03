const express=require('express');
const router=express.Router();

const orderController=require('../controllers/orderController.cjs');

router.post('/order',orderController.orderItem);
router.get('/getAllOrderedItems',orderController.getAllOrderedItems)
module.exports=router;