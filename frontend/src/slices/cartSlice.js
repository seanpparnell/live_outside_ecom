import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], isCartOpen: false };



const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x)
      } else {
        state.cartItems = [...state.cartItems, item]
      }

      return updateCart(state)
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
      return updateCart(state);
    },

    updateCartItemQuantity: (state, action) => {
      const { itemId, newQty } = action.payload;
      const itemToUpdate = state.cartItems.find((item) => item._id === itemId);

      if (itemToUpdate) {
        itemToUpdate.qty = newQty;
      }

      return updateCart(state);
    },

    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false
    }
  }
});

export const { addToCart, openCart, closeCart, removeFromCart, updateCartItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;