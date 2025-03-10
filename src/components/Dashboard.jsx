import { Avatar, IconButton,Card,CardMedia,Typography, CardContent, CardActions, Button,Select ,MenuItem,Chip,Box,TextField, Badge} from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import { CurrencyRupee } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ShoppingCart } from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import { Slider } from '@mui/material';
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import SlidersIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FavoriteRounded } from '@mui/icons-material';
import AccessibleBadges from './AccessibleBadge';
export default function Dashboard() {
const [fetchedProducts,setFetchedProducts]=useState([])
const [sortValue, setSortValue] = useState(""); 
const [priceRange, setPriceRange] = useState([0, 10000]); 
const [sliderLimits, setSliderLimits] = useState([0, 10000]);
const {role}=useParams();
const navigate=useNavigate();
const theme = useTheme();
const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
const [openDialog, setOpenDialog] = useState(false);
const [categories, setCategories] = useState([]);
const [openCategoryPopover, setOpenCategoryPopover] = useState(false);
const [userInfo,setUserInfo]=useState({})
const [addToCart,setAddToCart]=useState([])
useEffect(() => { 
    fetchProducts();
    console.log(localStorage.getItem('userInfo'));  
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
}, []);
const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:3005/products/user-products"); 
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
const handleMyProductsClick=async()=>{
  try {
    const response = await fetch("http://localhost:3005/products/seller-products"); 
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    setFetchedProducts(data.fetchedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
const handleSortChange = (event) => {
  const Value = event.target.value;
  setSortValue(Value);
  const sortedProducts = [...fetchedProducts]
  .filter((item) => item.price >= priceRange[0] && item.price <= priceRange[1])
  .sort((a, b) => (Value === "low" ? a.price - b.price : Value=== "high" ? b.price - a.price : 0));
  console.log(sortedProducts); 
  setFetchedProducts(sortedProducts);
  
};
const handleRangeChange = (event, newValue) => {
  setPriceRange(newValue);
};
 
const clearFilters = () => {
  setSortValue("");
  setPriceRange(sliderLimits); 
};
const fetchCategories = async () => {
  try {
    const response = await fetch("http://localhost:3005/products/category");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    setCategories(data.categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
const handleAddToCart=(product)=>{
  console.log(product,userInfo);
  
}
 
return (
    <div>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:5,max:300}}>
      <div> 
      <TextField
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
        sx={{ display: "block", width: "100%", maxWidth: "300px", mr: 1 }} /></div>
        {isLargeScreen?(
          
      <nav style={{cursor:'pointer'}}>
      {role==="seller"?(
        <ul style={{listStyle:'none',display:'flex',justifyContent:'space-evenly',gap:20,fontWeight:'bold'}}>
          <Chip onClick={()=>navigate('/dashboard/seller')} label="Home" sx={{fontSize:'15px'}}/>
          <Chip sx={{fontSize:"15px"}} onClick={handleMyProductsClick} label="MyProducts"/>
          <Chip  sx={{fontSize:"15px"}} label="MyOrders"/>
          <Popover open={openCategoryPopover} onOpenChange={setOpenCategoryPopover}>            <PopoverTrigger style={{border:'none',backgroundColor:'Background',display:'flex',alignContent:'center',fontWeight:'bold'}}>
          <Chip label="Category"  sx={{fontSize:"15px"}} onClick={fetchCategories} />
            </PopoverTrigger>
            <PopoverContent>
            <Card sx={{ padding: "12px", boxShadow: 5 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Categories
        </Typography>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.category}>
                <Chip label={category.category} sx={{ margin: "5px" }} />
              </li>
            ))
          ) : (
            <Typography>No categories available.</Typography>
          )}
        </ul>
      </Card> 
      </PopoverContent>
          </Popover>
          <AccessibleBadges icon={<ShoppingCartIcon sx={{fontSize:30}} />}/>
          <AccessibleBadges icon={<FavoriteRounded sx={{fontSize:30}}/>}/>
             </ul>
      ):(
        <ul style={{listStyle:'none',display:'flex',justifyContent:'space-evenly',gap:20,fontWeight:'bold'}}>
        <Chip onClick={()=>navigate('/dashboard/seller')} label="Home" sx={{fontSize:'15px'}}/>
        <Popover open={openCategoryPopover} onOpenChange={setOpenCategoryPopover}>            
          <PopoverTrigger style={{border:'none',backgroundColor:'Background',display:'flex',alignContent:'center',fontWeight:'bold'}}>
          <Chip label="Category"  sx={{fontSize:"15px"}} onClick={fetchCategories} />
            </PopoverTrigger>
            <PopoverContent>
            <Card sx={{ padding: "12px", boxShadow: 5 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Categories
        </Typography>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.category}>
                <Chip label={category.category} sx={{ margin: "5px" }} />
              </li>
            ))
          ) : (
            <Typography>No categories available.</Typography>
          )}
        </ul>
      </Card> 
      </PopoverContent>
          </Popover><Chip sx={{fontSize:"15px"}} label="Orders"/>
        <AccessibleBadges icon={<ShoppingCartIcon sx={{fontSize:30}} />}/>
        <AccessibleBadges icon={<FavoriteRounded sx={{fontSize:30}}/>}/>
      </ul>)}
      </nav>
        ):null}
        {!isLargeScreen?(
        <Popover>
          <PopoverTrigger style={{border:"none",backgroundColor:'Background'}}>
      <Avatar onClick={()=>setOpenDialog(!openDialog)} sx={{cursor:'pointer'}}>{userInfo.username[0]}</Avatar>
      </PopoverTrigger>
      <PopoverContent style={{margin:'7px'}}>
        <Card sx={{boxShadow:5}}>
      {role === "seller" ? (
            <ul style={{ listStyle: 'none', padding: 5, display: 'flex', flexDirection: 'column', gap: '5px', cursor: 'pointer', width: '200px' }}>
            <Chip label="Home" onClick={() => navigate('/dashboard/seller')} sx={{ width: "100%" }} />
            <Chip label="My Products" onClick={handleMyProductsClick} sx={{ width: "100%" }} />
            <Chip label="My Orders" sx={{ width: "100%" }} />
            <Popover open={openCategoryPopover} onOpenChange={setOpenCategoryPopover}>
              <PopoverTrigger style={{border:'none',backgroundColor:'Background',display:'flex',alignContent:'center',fontWeight:'bold'}}>
            <Chip label="Categories" sx={{ width: "100%" }} onClick={fetchCategories} />
            </PopoverTrigger>
            <PopoverContent>
            <Card sx={{ padding: "12px", boxShadow: 5 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Categories
        </Typography>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.category}>
                <Chip label={category.category} sx={{ margin: "5px" }} />
              </li>
            ))
          ) : (
            <Typography>No categories available.</Typography>
          )}
        </ul>
      </Card> 
      </PopoverContent>
          </Popover>
            <Chip label="Cart" icon={<ShoppingCartIcon />}  sx={{width:'100%'}}/>
            <Chip  label="Favourite" icon={<FavoriteRounded/>}  sx={{width:'100%'}}/>
            <Chip  label="Orders" sx={{width:'100%'}}/>
            <Button onClick={()=>navigate('/login')} sx={{width:'100%',borderRadius:"20px"}} variant='contained'>Logout</Button>
          </ul>        
          ) : (
            <ul style={{ listStyle: 'none', padding: 5, display: 'flex', flexDirection: 'column', gap: '5px', cursor: 'pointer', width: '200px' }}>
            <Chip label="Home" onClick={() => navigate('/dashboard/seller')} sx={{ width: "100%" }} />
            <Popover open={openCategoryPopover} onOpenChange={setOpenCategoryPopover}>
              <PopoverTrigger style={{border:'none',backgroundColor:'Background',display:'flex',alignContent:'center',fontWeight:'bold'}}>
            <Chip label="Categories" sx={{ width: "100%" }} onClick={fetchCategories} />
            </PopoverTrigger>
            <PopoverContent>
            <Card sx={{ padding: "12px", boxShadow: 5 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Categories
        </Typography>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.category}>
                <Chip label={category.category} sx={{ margin: "5px" }} />
              </li>
            ))
          ) : (
            <Typography>No categories available.</Typography>
          )}
        </ul>
      </Card> 
      </PopoverContent>
          </Popover>
            <Chip label="Cart" icon={<ShoppingCartIcon />}  sx={{width:'100%'}}/>
            <Chip  label="Favourite" icon={<FavoriteRounded/>}  sx={{width:'100%'}}/>
            <Chip  label="Orders" sx={{width:'100%'}}/>
            <Button onClick={()=>navigate('/login')} sx={{width:'100%',borderRadius:"20px"}} variant='contained'>Logout</Button>
          </ul>
          )}
        </Card>
      </PopoverContent>
      </Popover>):(<Popover>
        <PopoverTrigger style={{border:'none',background:'none'}}><Avatar>{userInfo.username[0]}</Avatar></PopoverTrigger>
        <PopoverContent>
          <Card>
           <Button onClick={()=>navigate('/login')}>Logout</Button>
          </Card>
        </PopoverContent>
      </Popover>)}
     </header>
     <div style={{display:'flex',margin:"10px",alignItems:'center',justifyContent:'end'}}>
      <Popover>
        <PopoverTrigger >
          <SlidersIcon/>
        </PopoverTrigger>
        <PopoverContent style={{margin:'10px',backgroundColor:"#fff",padding:'15px'}}>
          <Card sx={{padding:"12px",boxShadow:5}}>
        <section style={{ display: "flex", flexDirection: "column", gap: "16px"}}>
        <section>
            <Typography variant="body1" sx={{fontWeight:'bold',fontSize:"15px"}}>Sort Products</Typography>
            <Select
              value={sortValue}
              onChange={handleSortChange
              }
              displayEmpty
              autoWidth
              sx={{ mt: 1 }}
            >
              <MenuItem value="" disabled>Sort Products By</MenuItem>
              <MenuItem value="low">Price: Low to High</MenuItem>
              <MenuItem value="high">Price: High to Low</MenuItem>
            </Select>
          </section>
          <section style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography variant="body1" sx={{fontWeight:'bold',fontSize:"15px"}}>Price Range</Typography>
            <section style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "15px",placeItems:'center'}}>
              <Typography variant="body2" sx={{fontWeight:'bold',fontSize:"15px"}}>₹{priceRange[0]}</Typography>
              <Slider
                value={priceRange}
                max={sliderLimits[1]}
                step={1}
                onChange={handleRangeChange}
                sx={{ minWidth: "200px" }}
                valueLabelDisplay="auto"
              />
              <Typography variant="body2" sx={{fontWeight:'bold',fontSize:"15px"}}>₹{priceRange[1]}</Typography>
            </section>
          </section>
          <section>
            <Button fullWidth variant="contained" color="primary" onClick={clearFilters}>
              Clear Filters
            </Button>
          </section>
          </section>
          </Card>
        </PopoverContent>
      </Popover>
     </div>
     <section style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '1rem',margin:5 }}>
    {fetchedProducts.length > 0 ? (
      fetchedProducts
        .filter((item) => item.price >= priceRange[0] && item.price <= priceRange[1])
        .map((item) => (
          <Card key={item.product_id} sx={{display:'flex',flexDirection:'column',boxShadow:4}}>
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
                 {item.price}
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
              <Button variant="contained" endIcon={<ShoppingCart />} style={{fontWeight:'bold'}} onClick={()=>handleAddToCart(item)}>
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
