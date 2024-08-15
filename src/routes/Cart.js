/* eslint-disable */
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, plusAge } from "./../store/useSlice.js";
import { plusCount, minusCount, deleteItem } from "./../store/cartSlice.js";
import { memo, useState } from "react";

// 자식 컴포넌트를 꼭 필요할 때만 렌더링 하려면 memo() 사용
let Child = memo(() => {
  console.log("재렌더링됨");
  return <div>자식컴포넌트</div>
})

function Cart() {
  // redux에 등록된 모든 state를 가져와서 쓸 때 꺼내쓰는 방법
  let a = useSelector((state) => {
    return state;
  });
  // console.log(a.stock);

  // redux에 등록된 특정 state를 꺼내오는 방법
  let cartDatas = useSelector((state) => state.cart);

  // store.js에 정의된 함수를 쓰려면 dispatch 써야함
  let dispatch = useDispatch();

  let [count, setCount] = useState(0);

  return (
    <div>
      <Child></Child>
      <button onClick={()=>{setCount(count+1)}}>재렌더링용</button>
      {/* {a.user.name}의 장바구니 {a.user.age}살
      <button
        onClick={() => {
          dispatch(plusAge());
        }}
      >
        age+
      </button> */}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제하기</th>
          </tr>
        </thead>
        <tbody>
          {cartDatas.map((cart, i) => {
            return (
              <tr key={i}>
                <td>{cart.id}</td>
                <td>{cart.name}</td>
                <td>{cart.count}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(plusCount(cart.id));
                    }}
                  >
                    +
                  </button>
                  &nbsp;
                  <button
                    onClick={() => {
                      dispatch(minusCount(cart.id));
                    }}
                  >
                    -
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      // dispatch(changeName());
                      dispatch(deleteItem(cart.id));
                    }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
