const prisma=require('../prisma/prismaClient.cjs');

const addToWishList=async({userId,productId})=>{
    return await prisma.wishList.create({data:{userId,productId}})
};
const getWishListItems=async({userId})=>{
    return await prisma.wishList.findMany({
        where:{userId}
    })
};
const removeWishListItem=async({userId,productId})=>{
    return await prisma.wishList.update({where:{userId,productId}})
};
module.exports={
    addToWishList,
    getWishListItems,
    removeWishListItem
};