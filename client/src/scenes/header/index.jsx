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
} from "@mui/material";
import Header from "components/Header";
import Addbutton from "components/Addbutton";
import { readHeader } from "../../state/function/frontendAPI";

const Index = () => {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    readHeader()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  

  const handleEdit = (id) => {
    navigate(`/header/edit/${id}`);
  };
  

  return (
    <Box m="1.5rem 2.5rem">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Header title="Header" subtitle="List of Customers" />
        <Addbutton />
      </Box>

      {data.map((item, index) => (
        <Box
          mt="3rem"
          display="flex"
          justifyContent="center"
          key={index}
        >
          <Card sx={{ width: "80%", marginRight: "2rem" }}>
            <CardMedia component="img" sx={{ height: 250 }} image={item.url}/>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.text1}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.text2}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.button}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                marginTop: "4rem",
                marginLeft: "auto",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{
                  width: "110px",
                  height: "45px",
                  fontSize: "15px",
                  marginLeft: "1rem",
                }}
                onClick={() => handleEdit(item._id)}>
                Edit
              </Button>
            </CardActions>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default Index;





