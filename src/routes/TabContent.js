import { useEffect, useState, useContext } from "react";
import { Context1 } from './../App.js';

function TabContent({tab}) {
  let {stock} = useContext(Context1); // 부모가 넘긴 Context 받는 방법

  // if (props.tab === 0) {
  //   return <div>내용1</div>;
  // } else if (props.tab === 1) {
  //   return <div>내용2</div>;
  // } else {
  //   return <div>내용3</div>;
  // }

  // tab이라는 props가 변할 때마다 end 클래스를 붙였다 뗐다 하겠다.
  let [fade, setFade] = useState('');

  useEffect(()=>{
    let t = setTimeout(()=>{ setFade('end') }, 100);
    return() => {
      clearTimeout(t);
      setFade('');
    }
  }, [tab])

  return (<div className={`start ${fade}`}>
    재고
    {[<div>{stock[0]}</div>,<div>{stock[1]}</div>,<div>{stock[2]}</div>,][tab]}
    </div>);
}

// 1. props 붙이고 싶지 않으면 이런식으로 받을 수도 있다.
// function TabContent({tab}) {
//   if (tab === 0) {
//     return <div>내용1</div>;
//   } else if (tab === 1) {
//     return <div>내용2</div>;
//   } else {
//     return <div>내용3</div>;
//   }

// 2. return [<div>내용0</div>,<div>내용2</div>,<div>내용3</div>,][tab]
// 이런식으로 하면 배열의 i번째 요소를 리턴하는 것이므로 if문 없이도 가능
// }

export default TabContent;
