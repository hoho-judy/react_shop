/* eslint-disable */
import "./App.css";
import { useState, createContext } from 'react';
import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import Card from './components/Card.js';0
import Detail from './routes/Detail.js';
import About from './routes/About.js';
import Event from './routes/Event.js';
import bgImg from './img/bg.png'; // 이미지를 변수화해서 쓰고 싶을 때
import datas from './data.js';
import datas2 from './data2.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import Cart from './routes/Cart.js';

export let Context1 = createContext()

function App() {

  let [shoes, setShoes] = useState(datas);
  let navigate = useNavigate(); // 페이지 이동을 도와주는 hook
  let [stock] = useState([10, 11, 12]); // 3가지 상품의 각 재고 

  return (
    <div className="App">
      
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Judy's Shoes</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link href="#features">Products</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
     
      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg" style={{backgroundImage: `url(${bgImg})`}}></div>  
            <Container>
              <Row>
              {
                shoes.map((shoe, i)=>{
                  return (
                     <Card shoe={shoe} i={i} key={i}/>
                  )
                })
              }         
              </Row>
            </Container>
            <button onClick={()=>{
              // 1. axios 네트워크 에러로 import 한 데이터로 대체
              // let copyShoes = [...shoes];
              // datas2.forEach((newShoe)=>{
              //   copyShoes.push(newShoe);
              // })
              // 아래처럼 배열을 분해해서 다시 합칠 수 있음
              let copyShoes = [...shoes, ...datas2];
              setShoes(copyShoes);

              // 2. 데이터 보낼때(post)
              // axios.post('/요청url', {name: 'judy',});

              // 3. 동시에 ajax 요청 여러개 하려면
              // Promise.all([axios.get('url1')], [axios.get('url2')])
              // .then(res => console.log(res))
              // .catch(err => console.log(err))

              // 4. fetch는 json을 가져오면 그냥 json이기 때문에 변환을 해줘야한다.
              // axios는 문자열을 알아서 object array로 변환해주기 때문에 편리함 
              // fetch('/url')
              // .then(res => res.json())
              // .then(data => {})

            }}>더보기</button>
          </>
        } />
    
        <Route path="/detail/:id" element={
          <Context1.Provider value={{ stock }}>
            <Detail shoes={shoes}></Detail>
          </Context1.Provider>
        }></Route>

        {/* Nested Routes 사용 방법 */}
        {/* /about/member나 /about/location 으로 이동할 때 아래처럼 쓰면 됨 */}
        {/* Nested Routes된 것들은 부모 엘리먼트 내부 어디에 보여줄지를 작성해야함 */}
        <Route path="/about" element={<About></About>} >
            <Route path="member" element={<div>멤버들 정보</div>} />
            <Route path="location" element={<div>위치 정보</div>} />
        </Route>
        
        <Route path="/event" element={<Event></Event>}>
          <Route path="one" element={<div>첫 주문 시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰 받기</div>} />
        </Route>

        {/* 장바구니 페이지 만들기 */}
        <Route path="/cart" element={<Cart />}></Route>

        {/* <Route path="*" element={<div>없는페이지에요</div>} />  */}
      </Routes>
      

    </div>
  );
}

export default App;
