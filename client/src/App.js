import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React, { useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Customers from "scenes/customers";
import { themeSettings } from "theme";
import {
  EditProducts,
  CreateProduct,
  ShowProducts,
  AddAdmin,
  ShowAdmin,
  Dashboard,
  HeaderFront,
  EditHeaderFront,
  Layout,
} from "./scenes"
import { Login } from "components";
import { currentUser } from "state/function/users";
import { useDispatch } from "react-redux";
import { setUser } from "state/userSlice";
import { http, getToken } from 'utils'
import PrivateRoute from "utils/PrivateRoute";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = React.useState(false)

  useEffect(() => {
    (async () => {
      const _token = getToken();
      http.defaults.headers.common['authtoken'] = _token
      if (Object.entries(localStorage).length > 0 && _token && _token !== '' && _token !== null) {
        setIsLogin(true)
        await getCurrentUser(_token)
      }
    })()
  }, [isLogin])

  const getCurrentUser = async (token = '') => {
    try {
      const _res = await http.post('/user/currentUser')
      if (_res.status === 200) {
        dispatch(setUser({
          userId: _res.data?._id,
          firstname: _res.data?.firstname,
          role: _res.data?.role,
          avatarUrl: `${process.env.REACT_APP_BASE_URL}/${_res.data?.file.replace('image/', '')}`,
          token: token
        }));
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            <Route element={<PrivateRoute />}>
                <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* <Route path="/products" element={<Products />} /> */}
                <Route path="/customers" element={<Customers />} />
                <Route path="/header" element={<HeaderFront />} />
                <Route path="/header/edit/:id" element={<EditHeaderFront />} />
                <Route path="/blog" element={<ShowProducts />} />
                <Route path="/blog/create" element={<CreateProduct />} />
                <Route path="/blog/edit/:id" element={<EditProducts />} />
                <Route path="/admin" element={<ShowAdmin />} />
                <Route path="/admin/addadmin" element={<AddAdmin />} />
                <Route path="*" element={<div> Not Found or You do not have permission.</div>} />

              </Route>
            </Route>
            <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
