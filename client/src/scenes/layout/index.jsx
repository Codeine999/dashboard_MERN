import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Sidebar } from "components";
import { getUserSelector } from 'state/userSlice'
import { toggleSidebar } from "state/globalSlice";

const Layout = () => {

  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    localStorage.getItem("isSidebarOpen") === "true" ? true : false
  );
  const data = useSelector((state) => state)
  // console.log('data =>', data)
  const currentUser = useSelector(getUserSelector)

  useEffect(() => {

    if (isSidebarOpen) {
      localStorage.setItem("isSidebarOpen", "true");
    } else {
      localStorage.setItem("isSidebarOpen", "false");
    }
    setIsSidebarOpen(isSidebarOpen);
    dispatch(toggleSidebar());

  }, [isSidebarOpen, dispatch]);

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box display={isNonMobile ? 'flex' : 'block'} width="100%" height="100%">
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        handleSidebarToggle={handleSidebarToggle} />

      <Box flexGrow={1}>
        <Navbar
          user={currentUser || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;