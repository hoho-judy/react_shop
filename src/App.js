/* eslint-disable */
import "./App.css";
import { useState } from 'react';
import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import Card from './components/Card.js';
import Detail from './components/Detail.js';
import bgImg from './img/bg.png'; // 이미지를 변수화해서 쓰고 싶을 때
import datas from './data.js';
import { Routes, Route, Link } from 'react-router-dom';


function App() {

  let [shoes] = useState(datas);

  return (
    <div className="App">
      
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Judy's Shoes</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#features">Products</Nav.Link>
            <Nav.Link href="#pricing">Cart</Nav.Link>
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
                shoes.map((shoe)=>{
                  return (
                    <Link to="/detail" element={<Detail></Detail>}>
                      <Card shoe={shoe} />
                    </Link>
                  )
                })
              }         
              </Row>
            </Container>
          </>
        } />
        <Route path="/detail" element={<div>상세페이지</div>} />
      </Routes>
 
    </div>
  );
}

export default App;
