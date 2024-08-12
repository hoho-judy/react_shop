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
      minusCount(state, action) {
        let item = state.find(item => {
            return item.id === action.payload;
        })
        item.count--;
        if(item.count < 0) {
            item.count = 0;
        }
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
      // cart.js에서 받아온 상품의 id와 기존 state 안에 들어있는 객체들 id를 비교
      // 같은 id를 가진 객체의 index를 얻어옴
      // array.splice(삭제를 시작할 인덱스, 삭제할 개수) 로 해당 요소만 삭제
      deleteItem(state, action) {
        let index = state.findIndex(item => {
            return item.id === action.payload;
        })
        state.splice(index, 1);
      }
    },
  });
  
  export let { plusCount, minusCount, order, deleteItem } = cart.actions;

  export default cart;