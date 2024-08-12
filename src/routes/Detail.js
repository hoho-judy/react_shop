/* eslint-disable */
import { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import TabContent from './TabContent.js';
import { Context1 } from './../App.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { order } from "./../store/cartSlice.js";

const Button = styled.button`
  background: ${ props => props.bg }; // button 컴포넌트 쓸 때 색상을 파라미터로 받는 방법
  color: ${ props => props.bg == 'blue' ? 'white' : 'black' };
  padding: 10px;
`
// 스타일 재사용 방법
const NewBtn = styled.button(Button);

function Detail(props) {

  let {stock} = useContext(Context1); // 부모가 넘긴 Context 받는 방법

  let [sale, setSale] = useState(true);
  let [text, setText] = useState('');
  let {id} = useParams(); // 라우터 url에 파라미터 붙어서 올 때 여기에 담겨져서 옴
  let [tab, setTab] = useState(0); // 탭 ui를 보여줄 상태(탭 3개니까 0, 1, 2로 변경)
  let [fade2, setFade2] = useState(''); // 서서히 나타나게 하는 효과를 주기 위한 state
  
  let navigate = useNavigate();
  let dispatch = useDispatch();
  
  // useEffect()는 Detail 컴포넌트가 mount, update 될 때 실행됨
  // 쓰는 이유 :  오래걸리는 소스나 html 렌더링 후에 실행되어야만 하는 것들, 타이머 등
  // '2초 이내 구매시 할인' div 박스가 2초 후에 사라지는 코드 실행하기
  useEffect(()=>{
    let time = setTimeout(()=>{
      if(sale) {
        setSale(false);
      }
    }, 2000);

    setFade2('end');

    if(isNaN(text)) {
      alert('그러지마세요');
      setText('');
    }

    // useEffect가 실행되기 전에 뭘 실행시키고 싶으면 그걸 return()안에 작성(clean up function)
    // 기존에 돌아가던 타이머가 있다면 클리어 하고 새로 시작하는게 맞으므로 이런건 클린업 함수 안에 작성
    // 클린업 함수는 mount 될 때 실행 X, unMount될 때는 실행됨.
    return () => {
      setFade2('');
      clearTimeout(time);
      setText('');
    }
  }, [text])


  // find, filter 차이 : find는 조건에 충족하는 원소를 찾으면 원소 반환 후 바로 종료(없으면 undefined 반환)
  // filter는 조건을 충족하는 원소가 1개만 있더라도 끝까지 돌고, 배열로 반환
  let filterdShoes = props.shoes.find(shoe => {
    return shoe.id == id; 
  })
  
  return (
    <div className={`container start ${fade2}`}>
      {
        sale === true ? <div className='alert alert-warning'> 2초 이내 구매시 할인</div> : null
      }
      <div className="row">
        {/* <Button bg="blue">버튼</Button>
        <Button bg="orange">버튼</Button>
        <NewBtn>뉴버튼</NewBtn> */}
       
        <div className="col-md-6">
          <img
            src={filterdShoes.img}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <input type="text" onChange={(e) => { setText(e.target.value) }}></input>
          <h4 className="pt-5">{filterdShoes.title}</h4>
          <p>상품 ID : {filterdShoes.id}</p>
          <p>{filterdShoes.content}</p>
          <p>{filterdShoes.price}</p>
          <button className="btn btn-danger" onClick={()=>{
              dispatch(order(filterdShoes));
              navigate('/cart');
          }}>주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0"> 
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={()=>{setTab(0)}}>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={()=>{setTab(1)}}>버튼2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={()=>{setTab(2)}}>버튼3</Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent tab={tab} shoes={props.shoes}/>
    </div>
  );
}

export default Detail;
