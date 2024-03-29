import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };



const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, size, color, imgPath, quantity, countInStock } = action.payload;
      const compositeKey = `${product._id}-${color}-${size}`
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
          imgPath: imgPath,
          color: color,
          size: size,
          qty: quantity,
          itemPrice: product.price,
          countInStock: countInStock,
          compositeKey
        });
      }
      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.compositeKey !== action.payload);
      return updateCart(state);
    },

    updateCartItemQuantity: (state, action) => {
      const { compositeKey, newQty } = action.payload;
      const itemToUpdate = state.cartItems.find((item) => item.compositeKey === compositeKey);

      if (itemToUpdate) {
        itemToUpdate.qty = newQty;
      }

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state)
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    }
  }
});

export const { addToCart, removeFromCart, updateCartItemQuantity, saveShippingAddress, savePaymentMethod } = cartSlice.actions;

export default cartSlice.reducer;