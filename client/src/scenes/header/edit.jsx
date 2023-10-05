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
  Stack,
  Typography,
} from "@mui/material";
import Header from "components/Header";
import { getHeaderByID, updateHeader } from "../../state/function/frontendAPI"; 

import SubmitButton from "../../components/SubmitButton";

const Headerpage = () => {

  const theme = useTheme();
  const navigate = useNavigate();
  const params = useParams();

  const [data, setData] = useState({
    text1: "",
    text2: "",
    button: "",
  });

  const [fileOld, setFileOld] = useState();

  useEffect(() => {
    loadData(params.id)
    }, [])

  const loadData = async (id) => {
    getHeaderByID(id)
        .then((res) => {
            setData(res.data)
            setFileOld(res.data.file)
        })
      }

  const handleChange = (e) => {
    if(e.target.name === 'file') {
      setData({
        ...data,
        [e.target.name]: e.target.files[0]
      })
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value
      })
    }
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      console.log(data)
      console.log(fileOld)
      const formWithImageData = new FormData();
      for (const key in data ) {
        formWithImageData.append(key, data[key])
      }
      formWithImageData.append('fileold', fileOld)
      updateHeader(params.id, formWithImageData)
          .then(res => {
              console.log(res)
              navigate('/header')
          })
          .catch((err) => console.log(err)) 
  }

  

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Header" subtitle="List of Customers" />
      <form
        style={{
          marginTop: "20px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
        onSubmit={handleSubmit}
        encType='multipart/form-data'
      >
        <FormControl>
          <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16 }}>
            Text 1
          </FormHelperText>
          <TextField
            fullWidth
            required
            id="outlined-basic"
            color="info"
            variant="outlined"
            value={data.text1}
            onChange={e => handleChange(e)}
            name="text1"
          />
        </FormControl>
        <FormControl>
          <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16 }}>
            Text 2
          </FormHelperText>
          <TextField
            fullWidth
            required
            id="outlined-basic"
            color="info"
            variant="outlined"
            value={data.text2}
            onChange={e => handleChange(e)}
            name="text2"
          />
        </FormControl>
        <FormControl>
          <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16 }}>
            Button
          </FormHelperText>
          <TextField
            fullWidth
            required
            id="outlined-basic"
            color="info"
            variant="outlined"
            value={data.button}
            onChange={e => handleChange(e)}
            name="button"
          />
        </FormControl>

        <Stack direction="column" gap={1} justifyContent="center" mb={2}>
          <Stack direction="row" gap={2}>
            <Typography fontSize={16} fontWeight={500} my="10px">
              Header Image
            </Typography>

            <Button
              component="label"
              sx={{
                width: "fit-content",
                color: "#2ED480",
                textTransform: "capitalize",
                fontSize: 16,
              }}
            >
              Upload *
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => handleChange(e)}
                name="file"
              />
            </Button>
          </Stack>
          <Typography
            fontSize={14}
            color="#fcfcfc"
            sx={{ wordBreak: "break-all" }}
          ></Typography>
        </Stack>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <SubmitButton  onClick={handleSubmit} />
        </Box>
      </form>
    </Box>
  );
};

export default Headerpage;
