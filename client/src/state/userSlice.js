import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null, 
  firstname: null,
  role: null,
  token: null,
  avatarUrl: null,
  isAdminMenuOpen: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId
      state.firstname = action.payload.firstname
      state.role = action.payload.role
      state.token = action.payload.token
      state.avatarUrl = action.payload.avatarUrl
    
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    toggleAdminMenu: (state) => {
      state.isAdminMenuOpen = !state.isAdminMenuOpen;
    },
  },
});

export const { setUser, setLoading, toggleAdminMenu } = userSlice.actions;
export const getUserSelector = (store) => store.user
export default userSlice.reducer;
