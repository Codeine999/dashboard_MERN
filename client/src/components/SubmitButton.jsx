import React from 'react';
import { Button, Box, useTheme } from "@mui/material";



const SubmitButton = ({ onClick }) => {
    const theme = useTheme();
  return (
   <Box>
    <Button variant="contained"
          sx={{
            backgroundColor: "#2e7d32",
            color: "white",
            '&:hover': {
              backgroundColor: "#388e3c",
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

export default SubmitButton;