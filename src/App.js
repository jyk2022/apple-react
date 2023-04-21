import { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './componet/Card.jsx';
import data from './data.js';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';

function App() {
    let [shoes] = useState(data);
    let navi = useNavigate();

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
                            </div>
                        </>
                    }
                />
                <Route path="/Detail/:id" element={<Detail shoes={shoes} />} />
                <Route path="*" element={<div>404 페이지입니다</div>} />
                <Route path="/About" element={<About />}>
                    <Route path="meber" element={<div>멤버임</div>} />
                    <Route path="location" element={<div>위치정보임</div>} />
                </Route>
                <Route path="/Event" element={<Event />}>
                    <Route path="Yarn" element={<div>첫 주문시 양배추즙 서비슨</div>} />
                    <Route path="Qupon" element={<div>쿠폰정보임</div>} />
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
