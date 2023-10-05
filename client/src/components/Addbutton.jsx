import React from 'react';
import { Button, Box, useTheme } from "@mui/material";



const Addbutton = ({ onClick }) => {
    const theme = useTheme();
  return (
   <Box>
    <Button variant="contained"
          sx={{
            backgroundColor: "#303f9f",
            color: "white",
            '&:hover': {
              backgroundColor: "#283593",
            },
            width: "140px",
            height: "50px",
            fontSize: "1rem"
          }}
          onClick={onClick}
          >
          Add Blog
        </Button>
   </Box>
  );
};

export default Addbutton;