const express=require('express')

const router=express.Router()
const productController=require('../controllers/productController.cjs')

router.post('/add',productController.addproduct)
router.get('/get',productController.getproduct)
router.put('/update/:id',productController.updateproduct)
router.delete('/delete/:id',productController.deleteproduct)
module.exports=router;