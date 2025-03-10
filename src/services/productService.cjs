const prisma=require('../prisma/prismaClient.cjs');

const insertproduct = async (productDetails) => {
    return await prisma.products.create({ data: productDetails });
};

const fetchUserProduct = async (category) => {
    if (category) {
        return await prisma.products.findMany({
            where: { category },
        });
    }
    return await prisma.products.findMany();
}
const updation=async(id,data)=>{
    return await prisma.products.update({
        where: { product_id: Number(id) },
        data,
    });
}
const deletion=async(id)=>{
    return await prisma.products.delete({
        where: { product_id: Number(id) },
    });
}
const fetchSellerproducts=async(sellerId)=>{
    return await prisma.products.findMany({
        where:{sellerId}
    });
}
const getCategories=async()=>{
    return await prisma.products.findMany({
        distinct:'category',
        select:{
            category:true,
        },
    })
}
module.exports={
    insertproduct,
   fetchUserProduct,
    updation,
    deletion,
    fetchSellerproducts,
    getCategories
}