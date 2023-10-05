import React from 'react';
import { Typography, Box, useTheme } from "@mui/material";



const Header = ({ title, subtitle }) => {
    const theme = useTheme();
  return (
   <Box>
    <Typography
        color={theme.palette.mode === 'light' ? theme.palette.neutral[500] : theme.palette.neutral[0]}
        fontWeight="bold"
        sx={{ mb: "5px", fontSize: '25px'}}>
        {title}
        </Typography>
    <Typography
        variant="h7"
        color={theme.palette.mode === 'light' ? theme.palette.neutral[500] : theme.palette.neutral[0]}>
        {subtitle}
        </Typography>
   </Box>
  );
};

export default Header;