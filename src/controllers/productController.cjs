const productService=require('../services/productService.cjs');
const addproduct=async(req,res)=>{
    const { title, description, category, price, quantity, image, sellerId, tags } = req.body;    
    try{
        const newProduct = await productService.insertproduct({ title, description, category, price, quantity, image, sellerId, tags });
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    }catch(error){
        res.status(500).json({error:error.message})
    }
};

const getUserProducts=async(req,res)=>{
    try {
        const { category } = req.query;
        const products = await productService.fetchUserProduct(category);

        res.status(200).json({ fetchedProducts: products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCategories=async(req,res)=>{
    try{
        const categories=await productService.getCategories();
        res.status(200).json({categories:categories});
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const updateproduct=async(req,res)=>{
    try {
        const { id } = req.params;
        const { title, description, category, price, quantity, image, tags } = req.body;

        const updateProduct = await productService.updation(id, { title, description, category, price, quantity, image, tags });

        res.status(200).json({ message: "Product updated successfully", updateProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteproduct=async(req,res)=>{
    try {
        const { id } = req.params;
        const deleteProduct=await productService.deletion(id);

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getSellerProducts=async(req,res)=>{
    try {
        const { category } = req.query;
        const products = await productService.fetchSellerproducts(category);

        res.status(200).json({ fetchedProducts: products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports={
    addproduct,
    getUserProducts,
    updateproduct,
    deleteproduct,
    getSellerProducts,
    getCategories
};
