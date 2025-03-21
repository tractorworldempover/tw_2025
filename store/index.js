import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userDataSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/lib/persistStore";



const persistConfig = {
    key: 'root',
    storage,
  };
  
const persistedReducer = persistReducer(persistConfig, userReducer);
export const store = configureStore({
    reducer:{
        user: persistedReducer,
        // if require another reducer create file in slice folder and add here to access that reducer as like "userReducer  file"
    }
})

export const persistor = persistStore(store) 