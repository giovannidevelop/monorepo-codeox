import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage


const persistConfig = {
    key: "root",
    storage,
  };



const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
  });
 export const persistor = persistStore(store);
export default store;
