import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { Header, PieChart, Count } from "components";


const Dashboard = () => {
  return (
    <Box m='1.5rem 2.5rem'>
        <Header title="Dashboard" subtitle="List of Customers" />
      
      <Box mt='20px' display='flex' flexWrap='wrap' gap={4} >
      <PieChart
           title="Properties for Sale"
           value={684}
           series={[75, 25]}
           colors={['#475BE8', '#E4E8EF']}
         />
         <PieChart
           title="Properties for Rent"
           value={546}
           series={[60, 40]}
           colors={['#475BE8', '#E4E8EF']}
         />
         <PieChart
           title="Total Customer"
           value={5732}
           series={[75, 25]}
           colors={['#2ED480', '#E4E8EF']}
         />
         <PieChart
           title="Total City"
           value={90}
           series={[80, 20]}
           colors={['#FE6D8E', '#E4E8EF']}
         />
      </Box>
      <Stack mt="25px" width="100%" gap={4}
        direction={{xs: 'column', lg:'row'}}>
          <Count />

      </Stack>
      
    </Box>
  )
};

export default Dashboard;