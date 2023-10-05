import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  ArrowDropDownOutlined,
}
  from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Flexbetween from "components/Flexbetween";
import { useDispatch } from "react-redux";
import { setMode } from "state/globalSlice";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import useLogout from "../utils/logout";


const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const globalMode = useSelector((state) => state.global.mode);


  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleDarkModeToggle = () => {
    dispatch(setMode());
    localStorage.setItem("mode", globalMode === "dark" ? "light" : "dark");
  };

  const logout = useLogout();
  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: theme.palette.background.nav,
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <Flexbetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <Flexbetween
            backgroundColor={theme.palette.background.se}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </Flexbetween>
        </Flexbetween>

        {/* RIGHT SIDE */}
        <Flexbetween gap="1.5rem">
          <IconButton onClick={handleDarkModeToggle} >
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <NotificationsNoneOutlinedIcon sx={{ fontSize: "25px", }} />
          </IconButton>

          <Flexbetween>
            <Button onClick={handleClick}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItem: 'center',
                textTransform: 'none',
                gap: '1rem'
              }}>
              {
              user.avatarUrl === '' || user.avatarUrl === null ? '' :
                <>
                  <Box
                    component='img'
                    alt='profile'
                    src={user.avatarUrl}
                    loading="lazy"
                    height='32px'
                    width='32px'
                    borderRadius='50%'
                    sx={{ objectFit: 'cover' }} />

                  <Box textAlign='left'>
                    <Typography
                      fontWeight='bold'
                      fontSize='0.9rem'
                      sx={{ color: theme.palette.secondary[50] }}>
                      {user?.firstname || ''}
                    </Typography>

                    <Typography
                      fontSize='0.75rem'
                      sx={{ color: theme.palette.secondary[50] }}>
                      {user?.role || ''}
                    </Typography>
                  </Box>
                </>
              }
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: '25px' }}
              />

            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
              <MenuItem >Setting</MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </Flexbetween>
        </Flexbetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;