// // File: src/components/Dashboard/ProductFilters.jsx
// import React from 'react';
// import { Typography, Select, MenuItem, Slider, Button, Card } from '@mui/material';

// const ProductFilters = ({ 
//   sortValue, 
//   priceRange, 
//   sliderLimits, 
//   handleSortChange, 
//   handleRangeChange, 
//   clearFilters 
// }) => {
//   return (
//     <Card sx={{padding:"12px", boxShadow:5}}>
//       <section style={{ display: "flex", flexDirection: "column", gap: "16px"}}>
//         <section>
//           <Typography variant="body1" sx={{fontWeight:'bold', fontSize:"15px"}}>Sort Products</Typography>
//           <Select
//             value={sortValue}
//             onChange={handleSortChange}
//             displayEmpty
//             autoWidth
//             sx={{ mt: 1 }}
//           >
//             <MenuItem value="" disabled>Sort Products By</MenuItem>
//             <MenuItem value="low">Price: Low to High</MenuItem>
//             <MenuItem value="high">Price: High to Low</MenuItem>
//           </Select>
//         </section>
        
//         <section style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//           <Typography variant="body1" sx={{fontWeight:'bold', fontSize:"15px"}}>Price Range</Typography>
//           <section style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "15px", placeItems:'center'}}>
//             <Typography variant="body2" sx={{fontWeight:'bold', fontSize:"15px"}}>₹{priceRange[0]}</Typography>
//             <Slider
//               value={priceRange}
//               max={sliderLimits[1]}
//               min={sliderLimits[0]}
//               step={1}
//               onChange={handleRangeChange}
//               sx={{ minWidth: "200px" }}
//               valueLabelDisplay="auto"
//             />
//             <Typography variant="body2" sx={{fontWeight:'bold', fontSize:"15px"}}>₹{priceRange[1]}</Typography>
//           </section>
//         </section>
        
//         <section>
//           <Button 
//             fullWidth 
//             variant="contained" 
//             color="primary" 
//             onClick={clearFilters}
//           >
//             Clear Filters
//           </Button>
//         </section>
//       </section>
//     </Card>
//   );
// };

// export default ProductFilters;  


import React from 'react';
import { Select, MenuItem, Slider, Card, Typography } from '@mui/material';

export default function Filters({ sortValue, setSortValue, priceRange, setPriceRange, sliderLimits }) {
  return (
    <Card sx={{ padding: 2, marginBottom: 2 }}>
      <Typography>Sort Products</Typography>
      <Select value={sortValue} onChange={(e) => setSortValue(e.target.value)}>
        <MenuItem value="">Sort By</MenuItem>
        <MenuItem value="low">Price: Low to High</MenuItem>
        <MenuItem value="high">Price: High to Low</MenuItem>
      </Select>
      <Typography>Price Range</Typography>
      <Slider
        value={priceRange}
        onChange={(e, newValue) => setPriceRange(newValue)}
        min={sliderLimits[0]}
        max={sliderLimits[1]}
      />
    </Card>
  );
}
