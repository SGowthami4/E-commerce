const prisma=require('../prisma/prismaClient.cjs');

const addToCart=async({userId,productId,quantity})=>{
    return await prisma.cartItems.create({data:{userId,productId,quantity}})
};
const getCartItems=async({userId})=>{
    return await prisma.cartItems.findMany({
        where:{userId}
    })
};
const removeFromCart=async({userId,productId})=>{
    return await prisma.cartItems.delete({where:{userId,productId}})
};
module.exports={
    addToCart,
    getCartItems,
    removeFromCart
};