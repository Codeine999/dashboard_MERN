import React, { useState } from 'react';
import Header from 'components/Header';
import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SubmitButton from 'components/SubmitButton';
import { register } from 'state/function/auth';
import { useSelector } from 'react-redux';


const AddAdmin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  
  const menuItems = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
  ];

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: '',
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(formData, user.token);
      navigate("/admin")
      // console.log('Registration successful:', response.data);
    } catch (error) {   
      console.error('Registration error:', error);
    }
  };

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='ADD Admin' subtitle='List of Customers' />
      <Box borderRadius='15px' padding='20px'>
        <form
          style={{
            marginTop: '20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
          onSubmit={handleSubmit}
        >
          <Stack direction={isSmallScreen ? 'column' : 'row'} gap={isSmallScreen ? 0 : 1}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16 }}>
                First Name
              </FormHelperText>
              <TextField 
                fullWidth 
                required 
                color='info' 
                variant='outlined' 
                type='text'
                label="Name"
                value={formData.firstname}
                onChange={(e) => setFormData((prevData) => ({ ...prevData, firstname: e.target.value }))}
                />
            </FormControl>

            {!isSmallScreen && <Box width={16} />}
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16 }}>
                Last name
              </FormHelperText>
              <TextField 
                fullWidth 
                required 
                variant='outlined' 
                color='info' 
                type='text'
                label="lastname"
                value={formData.lastname}
                onChange={(e) => setFormData((prevData) => ({ ...prevData, lastname: e.target.value }))}
              />
            </FormControl>
          </Stack>

          <FormControl>
            <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16 }}>
              Email
            </FormHelperText>
            <TextField 
              fullWidth 
              required 
              variant='outlined' 
              color='info' 
              type='email'
              label="email"
              value={formData.email}
              autoComplete="off"
              onChange={(e) => setFormData((prevData) => ({ ...prevData, email: e.target.value }))}
            />
          </FormControl>

          <Stack direction={isSmallScreen ? 'column' : 'row'} gap={isSmallScreen ? 0 : 1}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16 }}>
                Password
              </FormHelperText>
              <TextField 
                fullWidth 
                required 
                id='password' 
                variant='outlined' 
                color='info' 
                type='password'
                label="Password"
                value={formData.password}
                autoComplete="off"
                onChange={(e) => setFormData((prevData) => ({ ...prevData, password: e.target.value }))}
                
              />
            </FormControl>
            {!isSmallScreen && <Box width={16} />}
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16 }}>
                Role
              </FormHelperText>
              <Select
                variant='outlined'
                id='role'
                name='role'
                color='info'
                displayEmpty
                required
                inputProps={{ 'aria-label': 'Without label' }}
                defaultValue=''
                value={formData.role}
                onChange={(e) => setFormData((prevData) => ({ ...prevData, role: e.target.value }))}
              >
                {menuItems.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack direction='column' gap={1} justifyContent='center' mb={2}>
            <Stack direction='row' gap={2}>
              <Typography fontSize={16} fontWeight={500} my='10px'>
                Picture Profile
              </Typography>
            <Button component="label" 
              sx={{ 
                width: 'fit-content',
                color: '#2ED480',
                textTransform: 'capitalize',
                fontSize: 16 
              }}>
              Upload *
              <input
                hidden
                accept="image/*"
                type="file"
                name='image'
                onChange={handleImageUpload}
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
              {formData.image ? formData.image.name : ''}
              </Typography>
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <SubmitButton onClick={handleSubmit} />
        </Box>
      </form>
    </Box>
    </Box>
  )
}

export default AddAdmin;