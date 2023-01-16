import { createContext, useState } from "react";
import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import data from './data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';
import axios from 'axios';
import Cart from './routes/Cart';

export let Context1 = createContext();

function Product(props) {
  return (
    <div className="col-md-4">
      <img src={"https://codingapple1.github.io/shop/shoes"+props.index+".jpg"} width="80%" />
      <h4>{props.title}</h4>
      <p>{props.content}</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사 정보</h4>
      <Outlet></Outlet> {/* nested route's element 보여줄 자리 */}
    </div>
  )
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet> {/* nested route's element 보여줄 자리 */}
    </div>
  )
}

function App() {

  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();
  let [stock] = useState([10, 11, 12]);

  return (
    <div className="App">
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => { navigate('/') }}>ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element = {
          <>
                <div className="main-bg"></div>

                <div className="container">
                  <div className="row">
                    {
                    shoes.map((s, i) => {
                      return (
                        <Product index={i+1} title={s.title} content={s.content} />
                      )
                    })
                    }
                  </div>
                </div>

                <button onClick={()=>{
                  axios.get('https://codingapple1.github.io/shop/data2.json').then((result)=>{
                    let copy = [...shoes, ...result.data];
                    setShoes(copy);
                  })
                  .catch(()=>{
                    console.log('실패함')
                  })
                }}>더보기</button>
          </>
        } />
        <Route path="/detail/:id" element={
          <Context1.Provider value={{stock, shoes}}>
            <Detail shoes={shoes} />
          </Context1.Provider>
        } />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버</div>}/>
          <Route path="location" element={<div>위치</div>}/>
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}/>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
        </Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="*" element={<div>없는페이지</div>} />
      </Routes>



    </div>
  );
}

export default App;
