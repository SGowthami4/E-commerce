// // File: src/components/Dashboard/ProductCard.jsx
// import React from 'react';
// import { 
//   Card, CardMedia, CardContent, CardActions, Typography, Button 
// } from '@mui/material';
// import { CurrencyRupee, ShoppingCart } from '@mui/icons-material';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// const ProductCard = ({ product, userInfo }) => {
//   const handleAddToCart = () => {
//     console.log(product, userInfo);
//     // Implement your add to cart logic here
//   };

//   return (
//     <Card sx={{display:'flex', flexDirection:'column', boxShadow:4}}>
//       <div style={{display:'flex', justifyContent:'end', margin:'.5em'}}>
//         <FavoriteBorderIcon sx={{fontSize:'2em'}}/>
//       </div>
      
//       <CardMedia
//         component="img"
//         image={product.image}
//         alt={product.title}
//         style={{objectFit:'contain', aspectRatio:'1/1'}}
//       />
      
//       <CardContent>
//         <Typography variant="h6" sx={{ fontSize: '1em', fontWeight:'bold', display:'flex', alignItems:'center' }}>
//           <CurrencyRupee style={{textAlign:'center', fontSize:'1em', fontWeight:'bold'}}/>
//           {product.price}
//         </Typography>
        
//         <Typography variant='h4' sx={{
//           fontSize:'1.1em',
//           fontWeight:'bold',
//           WebkitBoxOrient:'vertical',
//           display:'-webkit-box',
//           WebkitLineClamp:1,
//           overflow:'hidden'
//         }}>
//           {product.title}
//         </Typography>
        
//         <Typography variant="h7" sx={{
//           display: '-webkit-box',
//           WebkitBoxOrient: 'vertical',
//           WebkitLineClamp: 1, 
//           overflow: 'hidden',
//           fontSize:'1em'
//         }}>
//           {product.description}
//         </Typography> 
//       </CardContent>
      
//       <CardActions style={{display:'flex', justifyContent:'flex-start', alignContent:'center'}}>
//         <Button 
//           variant="contained" 
//           endIcon={<ShoppingCart />} 
//           style={{fontWeight:'bold'}} 
//           onClick={() => handleAddToCart()}
//         >
//           Add to cart
//         </Button> 
//       </CardActions>
//     </Card>
//   );
// };

// export default ProductCard;  









import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

export default function ProductCard({ product }) {
  return (
    <Card>
      <CardMedia image={product.image} component="img" height="140" />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography>₹{product.price}</Typography>
        <Button variant="contained">Add to Cart</Button>
      </CardContent>
    </Card>
  );
}
