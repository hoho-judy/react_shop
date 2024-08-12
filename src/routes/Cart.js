/* eslint-disable */
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, plusAge } from "./../store/useSlice.js";
import { plusCount } from "./../store/cartSlice.js";

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

  return (
    <div>
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
                      // dispatch(changeName());
                      dispatch(plusCount(cart.id));
                    }}
                  >
                    +
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
