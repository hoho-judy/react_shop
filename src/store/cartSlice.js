import { createSlice } from "@reduxjs/toolkit";
import cartDatas from "./../cartDatas";

let cart = createSlice({
    name: "cartDatas",
    initialState: cartDatas,
  
    reducers: {
      plusCount(state, action) {
        let item = state.find(item => {
            return item.id === action.payload;
        })
        item.count += 1;
      },
      order(state, action) {
        // action.payload.id가 기존 state 안에 있으면 해당 상품 수량을 +1
        // 새로운 id이면 새 객체를 만들어서 state에 push
        let a = state.find(item => {
            return item.id === action.payload.id;
        })
        if(a) {
            a.count += 1;
        } else {
            let newItem = {};
            newItem.id = action.payload.id;
            newItem.name = action.payload.title;
            newItem.count = 1;
            state.push(newItem);
        }
      },
    },
  });
  
  export let { plusCount, order } = cart.actions;

  export default cart;