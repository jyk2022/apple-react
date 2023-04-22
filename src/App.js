import { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './componet/Card.jsx';
import Detail from './routes/Detail';
import data from './data.js';
import axios from 'axios';

function App() {
    const [shoes, setShoes] = useState(data);
    const navi = useNavigate();
    const [buttonClicked, setButtonClicked] = useState(false);
    const [pageNumber, setPageNumber] = useState(2); // 새로운 state 변수 추가
    const [isLoading, setIsLoading] = useState(false);
    const fetchMoreData = () => {
        setIsLoading(true);
        let number = pageNumber;
        axios
            .get(`https://codingapple1.github.io/shop/data${number}.json`)
            .then((response) => {
                console.log(response.data);
                let copy = [...shoes, ...response.data];
                setShoes(copy);
                setButtonClicked(true);
                setPageNumber(pageNumber + 1);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log('실패함', error);
                setIsLoading(false);
            });
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand
                        href="#home"
                        onClick={() => {
                            navi('/');
                        }}
                    >
                        쇼핑몰 쇼핑바
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link
                            onClick={() => {
                                navi('/');
                            }}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => {
                                navi('/Detail');
                            }}
                        >
                            Cart
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => {
                                navi('/Event');
                            }}
                        >
                            EVENT
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <div className="main-bg"></div>
                            <div className="container">
                                <div className="row">
                                    {shoes.map((shoe) => (
                                        <Card shoes={shoe} key={shoe.id} />
                                    ))}
                                </div>
                                {isLoading ? (
                                    <div>Loading...</div>
                                ) : pageNumber <= 3 ? (
                                    <button onClick={fetchMoreData}>더보기</button>
                                ) : null}
                            </div>
                        </>
                    }
                />
                <Route path="/Detail/:id" element={<Detail shoes={shoes} />} />
                <Route path="*" element={<div>404 페이지입니다</div>} />
                <Route path="/About" element={<About />}>
                    <Route path="member" element={<div>회사 멤버</div>} />
                    <Route path="location" element={<div>회사 위치</div>} />
                </Route>
                <Route path="/Event" element={<Event />}>
                    <Route path="yarn" element={<div>첫 주문시 양배추즙 증정</div>} />
                    <Route path="coupon" element={<div>쿠폰 정보</div>} />
                </Route>
            </Routes>
        </>
    );
}

function About() {
    return (
        <div>
            <h4>회사정보임</h4>
            <Outlet></Outlet>
        </div>
    );
}

function Event() {
    return (
        <div>
            <h4>오늘의 이벤트</h4>
            <Outlet></Outlet>
        </div>
    );
}

export default App;
