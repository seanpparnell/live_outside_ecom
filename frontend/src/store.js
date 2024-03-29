import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import categorySliceReducer from "./slices/categorySlice";
import authSliceReducer from "./slices/authSlice";
import cartSliceReducer from "./slices/cartSlice";
import filtersSliceReducer from "./slices/filtersSlice";

// const authPersistConfig = {
//   key: "auth",
//   storage: storage,
// };

// const cartPersistConfig = {
//   key: "cart",
//   storage: storage,
// };

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: storage,
    blacklist: ["auth", "cart", "category", apiSlice.reducerPath],
  },
  combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
    category: categorySliceReducer,
    filters: filtersSliceReducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

const persistor = persistStore(store);

export { store, persistor };
