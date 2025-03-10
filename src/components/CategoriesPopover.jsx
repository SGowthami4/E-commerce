import React, { useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Chip, Card, Typography } from "@mui/material";

export default function CategoriesPopover() {
  const [categories, setCategories] = useState([]);
  let component= <Chip label="Categories" sx={{ fontSize: "15px", cursor: "pointer",border:'none' }} />

  useEffect(() => {
    fetchCategories();
  }, []);

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

  return (
    <Popover>
      <PopoverTrigger>
        {component}
      </PopoverTrigger>
      <PopoverContent>
        <Card sx={{ padding: "12px", boxShadow: 5, minWidth: "200px" }}>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <Chip key={index} label={category} sx={{ margin: "5px", fontSize: "14px" }} />
            ))
          ) : (
            <Typography>No categories available.</Typography>
          )}
        </Card>
      </PopoverContent>
    </Popover>
  );
}
