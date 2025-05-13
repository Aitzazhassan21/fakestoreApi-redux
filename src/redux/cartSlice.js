// cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

const storeInLocalStorage = (data) => {
  localStorage.setItem('cart', JSON.stringify(data));
};

const initialState = {
  carts: fetchFromLocalStorage(),
  itemsCount: 0,
  totalAmount: 0,
  isVisible: false,
};

const cartSlice = createSlice({
  name: 'cart', // This is the missing 'name' option
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isItemInCart = state.carts.find(item => item.id === action.payload.id);

      if (isItemInCart) {
        const tempCart = state.carts.map(item => {
          if (item.id === action.payload.id) {
            let tempQty = item.quantity + action.payload.quantity;
            let tempTotalPrice = tempQty * item.price;
            return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
          } else {
            return item;
          }
        });
        state.carts = tempCart;
        storeInLocalStorage(state.carts);
      } else {
        state.carts.push(action.payload);
        storeInLocalStorage(state.carts);
      }
      state.itemsCount = state.carts.reduce((count, item) => count + item.quantity, 0);
    },

    removeFromCart: (state, action) => {
      const tempCart = state.carts.filter(item => item.id !== action.payload);
      state.carts = tempCart;
      storeInLocalStorage(state.carts);
      state.itemsCount = state.carts.reduce((count, item) => count + item.quantity, 0);
    },

    toggleCartQty: (state, action) => {
      const tempCart = state.carts.map(item => {
        if (item.id === action.payload.id) {
          let tempQty = item.quantity;
          let tempTotalPrice = 0;
          if (action.payload.type === 'INC') {
            tempQty++;
          } else if (action.payload.type === 'DEC') {
            tempQty--;
          }
          tempTotalPrice = tempQty * item.price;
          return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
        } else {
          return item;
        }
      }).filter(item => item.quantity > 0);
      state.carts = tempCart;
      storeInLocalStorage(state.carts);
      state.itemsCount = state.carts.reduce((count, item) => count + item.quantity, 0);
    },

    toggleCartVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { addToCart, removeFromCart, toggleCartQty, toggleCartVisibility } = cartSlice.actions;

export default cartSlice.reducer;
