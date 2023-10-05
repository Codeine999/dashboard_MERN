import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { readBlog, updateBlog  } from "state/function/frontendAPI";
import Header from "components/Header";
import SubmitButton from "../../components/SubmitButton";

const Edit = () => {
  const theme = useTheme();
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    loadData(params.id);
  }, [params.id]);

  const loadData = async (id) => {
    readBlog(id).then((res) => {
      setData(res.data);
    });
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setData({
      ...data,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
    const formData = new FormData();
  
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", data.image);
  
    
      const res = await updateBlog(params.id, formData);
      console.log(res);
      navigate("/blog");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Edit Blog" subtitle="List of Customers" />
      <form
        style={{
          marginTop: "20px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
        onSubmit={handleSubmit}
      >
         <FormControl>
            <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16 }}>Enter property name</FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              name="title"
              variant="outlined"
              value={data.title}
              onChange={handleChange}
            /> 
          </FormControl>


        <FormControl>
          <FormHelperText
            sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16 }}
          >
            Property Description
          </FormHelperText>
          <TextareaAutosize
            minRows={5}
            required
            placeholder="Write description of property"
            color="info"
            style={{
              width: "100%",
              background: "transparent",
              fontSize: "16px",
              borderRadius: 6,
              padding: 10,
              color: "#919191",
            }}
            name="description"
            value={data.description}
            onChange={handleChange}
          />
        </FormControl>

        <Stack direction="column" gap={1} justifyContent="center" mb={2}>
          <Stack direction="row" gap={2}>
            <Typography fontSize={16} fontWeight={500} my="10px">Blog Image</Typography>
            <Button component="label" sx={{ width: 'fit-content', color: '#2ED480', textTransform: 'capitalize', fontSize: 16 }}>
              Upload *
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImageChange}
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
              {data.image ? data.image.name : ''}
              </Typography>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <SubmitButton onClick={handleSubmit} />
        </Box>
      </form>
    </Box>
  );
};

export default Edit;
