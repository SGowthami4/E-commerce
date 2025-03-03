import { Avatar, IconButton,TextField,Card,CardHeader,CardMedia,Typography, CardContent, CardActions, Button } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import { useState } from 'react';
import { CurrencyRupee } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ShoppingCart } from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import { Box,Slider } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
export default function Dashboard() {
  const [fetchedProducts,setFetchedProducts]=useState([])
  const [priceRange, setPriceRange] = useState([0, 10000]); 
  const [sliderLimits, setSliderLimits] = useState([0, 10000]);
  const {role}=useParams();
  const navigate=useNavigate();
  useEffect(() => { 
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3005/products/get"); 
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      if (data.fetchedProducts.length > 0) {
      const prices = data.fetchedProducts.map(product => product.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setSliderLimits([minPrice, maxPrice]);
      setPriceRange([minPrice, maxPrice]);
      }
      setFetchedProducts(data.fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  return (
    <div>
     <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:5,max:300}}>
      <div> <TextField
        label="Search"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{ display: "block", width: "100%", maxWidth: "300px", mr: 1 }}      /></div>
      <nav style={{cursor:'pointer',}}>
      {role==="seller"?(
        <ul style={{listStyle:'none',display:'flex',justifyContent:'space-evenly',gap:20,fontWeight:'bold'}}>
          <li onClick={()=>navigate('/dashboard/seller')}>Home</li>
          <li>MyProducts</li>
          <li>MyOrders</li>
        </ul>
      ):(<ul>
        <li onClick={()=>navigate('/dashboard/customer')}>Home</li>
        <li>Cart</li>
        <li>wishlist</li>
        <li>Order</li>
      </ul>)}
      </nav>
      <div><Avatar>G</Avatar></div>
     </header>
     <div style={{display:'flex',justifyItems:'space-between',margin:5,alignItems:'center'}}>
     <Box sx={{ width: 300, margin: "20px auto" }}>
        <Typography variant="h6">Filter by Price</Typography>
        <Slider
          value={priceRange}
          onChange={handleRangeChange}
          valueLabelDisplay="auto"
          min={sliderLimits[0]}
          max={sliderLimits[1]}
          step={100}
        />
        <Typography>₹{priceRange[0]} - ₹{priceRange[1]}</Typography>
      </Box>
      <TuneIcon  style={{cursor:'pointer'}}/>
     </div>
     <section style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '1rem',margin:5 }}>
    {fetchedProducts.length > 0 ? (
      fetchedProducts
        .filter((item) => item.price >= priceRange[0] && item.price <= priceRange[1])
        .map((item) => (
          <Card key={item.product_id} style={{display:'flex',flexDirection:'column'}}>
            <div style={{display:'flex',justifyContent:'end',margin:'.5em'}}>
              <FavoriteBorderIcon sx={{fontSize:'2em'}}/>
            </div>
            <CardMedia
              component="img"
              image={item.image}
              alt={item.title}
              style={{objectFit:'contain',aspectRatio:'1/1'}}
            />
            <CardContent>
              <Typography variant="h6" sx={{ fontSize: '1em',fontWeight:'bold',display:'flex',alignItems:'center' }}>
                <CurrencyRupee style={{textAlign:'center',fontSize:'1em',fontWeight:'bold'}}/>
                .{item.price}
              </Typography>
              <Typography variant='h4' sx={{fontSize:'1.1em',fontWeight:'bold',
                WebkitBoxOrient:'vertical',
                display:'-webkit-box',
                WebkitLineClamp:1,
                overflow:'hidden'
              }}>
                {item.title}
              </Typography>
              <Typography
                variant="h7"
                sx={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 1, 
                  overflow: 'hidden',
                  fontSize:'1em'
                }}
              >
                {item.description}
              </Typography> 
            </CardContent>
            <CardActions style={{display:'flex',justifyContent:'flex-start',alignContent:'center'}}>
              <Button variant="contained" endIcon={<ShoppingCart />} style={{fontWeight:'bold'}}>
                Add to cart
              </Button> 
            </CardActions>
          </Card>
        ))
    ) : (
      <p>No products available.</p>
    )}
</section>

    </div>
  )
}
