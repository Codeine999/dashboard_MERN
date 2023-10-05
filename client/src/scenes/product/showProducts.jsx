import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  CardMedia,
  Button,
  Typography,
  Rating,
  TextField,
  useTheme,
} from "@mui/material";
import Header from "components/Header";
import { useGetBlogsQuery, useDeletePostMutation, useGetCustomersQuery  } from "state/api";
import Addbutton from "components/Addbutton";
import Swal from "sweetalert2";

const Headerpage = () => {
  const theme = useTheme();
  const navigate = useNavigate();


  const handleAddBlogClick = () => {
    navigate("/blog/create");
  };
  const handleEditBlog = async (id) => {
    navigate(`/blog/edit/${id}`);
    
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this blog!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
        reverseButtons: true, 
      });
  
      if (result.isConfirmed) {
        const { error } = await deletePost(id);
        if (error) {
          console.error('Error deleting blog:', error);
          Swal.fire('Error!', 'An error occurred while deleting the blog.', 'error');
        } else {
          Swal.fire('Deleted!', 'The blog has been deleted.', 'success');
        }
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };
  const [deletePost] = useDeletePostMutation();
  const { data: blogs, isLoading,  } = useGetBlogsQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Header title="Blog" subtitle="List of Customers" />
        <Addbutton onClick={handleAddBlogClick} />
      </Box>
      <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
      {isLoading ? (
        <Typography>Loading blogs...</Typography>
      ) : (
        <>
          {blogs.map((blog) => (
            <Box mt="3rem" key={blog._id} >
              <Card sx={{ maxWidth: 370, marginRight: "2rem", bgcolor:theme.palette.mode === 'dark' ? '#2C2C2C' : '#FCFCFC' }} >
                <CardMedia 
                component="img"
                  sx={{ height: 140 }}
                  image={blog.image}
                  title={blog.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blog.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", marginTop: "4rem", marginLeft: "5rem" }}>
                    <Button type="submit" variant="contained" 
                      sx={{ width: "70px",
                            height: "40px", 
                            fontSize: "15px", 
                            marginRight: "1rem",
                            background: "#4153AC"
                             }}
                    onClick={() => handleEditBlog(blog._id)}>
                      Edit
                    </Button>
                    <Button type="submit" variant="contained" 
                      sx={{ width: "70px",
                            height: "40px",
                            fontSize: "15px",
                            background: '#E25760' }}
                      onClick={() => handleDelete(blog._id)}>
                      Delete
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Box>
          ))}
        </>
      )}
      </Box>
    </Box>
  );
};

export default Headerpage;
