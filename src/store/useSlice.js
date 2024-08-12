import { createSlice } from "@reduxjs/toolkit";

// 1. state 작성은 createSlice안에 작성
let user = createSlice({
  name: "user",
  initialState: { name: "judy", age: 20 },

  // state 수정 함수 작성(기존 state가 파라미터로 올 수 있음)
  reducers: {
    changeName(state) {
      state.name = "juyeon";
    },
    printName(state) {
      console.log(`${state} kim`);
    },
    plusAge(state) {
      state.age += 1;
    },
  },
});

// 만든 함수 이름을 모두 나열하고 한꺼번에 export
export let { changeName, printName, plusAge } = user.actions;

export default user;