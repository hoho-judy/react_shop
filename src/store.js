import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from './store/useSlice.js'
import cart from './store/cartSlice.js'

let stock = createSlice({
  name: "stock",
  initialState: [10, 23, 445],
});

// 2. 위에서 만든 state를 등록
export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});
