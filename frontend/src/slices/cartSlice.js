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
      const { product, size, color, selectedColorImgPath, quantity } = action.payload;

      const existItemIndex = state.cartItems.findIndex((x) => x._id === product._id && x.size === size && x.color === color);

      if (existItemIndex !== -1) {
        // If the item already exists in the cart, update its quantity
        state.cartItems[existItemIndex].qty += 1;
      } else {
        // If the item doesn't exist, add it to the cart
        state.cartItems.push({
          _id: product._id,
          name: product.name,
          description: product.description,
          path: selectedColorImgPath,
          color: color,
          size: size,
          qty: quantity,
          itemPrice: product.price,
        });
      }
      return updateCart(state);
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
  }
});

export const { addToCart, removeFromCart, updateCartItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;