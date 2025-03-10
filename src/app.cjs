const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const authRoutes=require('./routes/authRoutes.cjs')
const productRoutes=require('./routes/productRoutes.cjs')
const cartRoutes=require('./routes/cartRoutes.cjs')
const orderRoutes=require('./routes/orderRoutes.cjs')

dotenv.config();
const app=express()
app.use(express.json())
app.use(cors());


app.use('/auth',authRoutes);
app.use('/products',productRoutes);
app.use('/cart',cartRoutes);
// app.use('/orders',orderRoutes);
module.exports = app;