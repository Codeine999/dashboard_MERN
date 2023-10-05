import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from 'redux-persist';
import globalReducer from "state/globalSlice";
import persistedAuthReducer from './authSlice'; 
import userReducer from './userSlice';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { api } from 'state/api';


const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: persistedAuthReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(api.middleware),
});


const persistor = persistStore(store);

export const clearPersistor = () => {
    const persistor = persistStore(store);
    persistor.purge(); 
  };


export { store, persistor }; 



