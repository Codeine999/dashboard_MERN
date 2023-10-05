import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
  isAuthenticated: false,
  mode: 'light', 
  isSidebarOpen: true,
};

const authPersistConfig = {
  key: 'auth', 
  storage,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      // state.mode = initialState.mode;
      // state.isSidebarOpen = initialState.isSidebarOpen;
    },
  },
});


export const { login, logout } = authSlice.actions;
export const getAuthSelector = (state) => state.auth.isAuthenticated
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice.reducer);
export default persistedAuthReducer;


