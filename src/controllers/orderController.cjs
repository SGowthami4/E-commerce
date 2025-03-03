const orderService=require('../services/orderService.cjs');
const orderItem=async(req,res)=>{
    const {userId,productId,totalAmount,status,createdAt}=req.body;
    try{
        const orderProducts=await orderService.orderItem({userId,productId,totalAmount,status,createdAt});
        res.status(201).json({message:'ordered Successfully'})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}