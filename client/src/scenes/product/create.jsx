import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  useMediaQuery,
  FormControl,
  FormHelperText,
  TextareaAutosize,
  Typography,
  MenuItem,
  Stack,
  Select,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Header from "components/Header";
import { useCreateBlogMutation } from "../../state/api";
import SubmitButton from "../../components/SubmitButton"


const Form = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [createBlog] = useCreateBlogMutation();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);

        await createBlog(formData).unwrap();
        setTitle("");
        setDescription("");
        setImage("");

        navigate('/blog');
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please select an image.");
    }
  };


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADD New Blog" subtitle="List of Customers" />
      <Box borderRadius="15px" padding="20px" >
        <form
          style={{ marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}
          onSubmit={handleSubmit}

        >
          <FormControl>
            <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16 }}>Enter property name</FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            /> 
          </FormControl>

          <FormControl>
            <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16 }}>Property Description</FormHelperText>
            <TextareaAutosize
              minRows={5}
              required
              placeholder="Write description of property"
              color="info"
              style={{ width: '100%', background: 'transparent', fontSize: '16px', borderRadius: 6, padding: 10, color: '#919191' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography fontSize={16} fontWeight={500} my="10px">Property Photo</Typography>

              <Button component="label" sx={{ width: 'fit-content', color: '#2ED480', textTransform: 'capitalize', fontSize: 16 }}>
                Upload *
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Button>
            </Stack>
        
            <Typography
              fontSize={14}
              sx={{
                wordBreak: 'break-all',
                color: theme.palette.mode === 'dark' ? 'white' : 'black', 
              }}
              >
              {image ? image.name : ''}
              </Typography>
            
          </Stack>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
            <SubmitButton onClick={handleSubmit} />
          </Box>
        </form>

      </Box>
    </Box>
  );
};

export default Form;
