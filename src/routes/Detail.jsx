import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/itemSlice';

function Detail(props) {
    let { id } = useParams();
    let dispactch = useDispatch();
    let shoes = props.shoes.find((product) => {
        return product.id == id;
    });

    let [alertCnt, setAlertCnt] = useState(2);
    let [alert, setAlert] = useState(true);
    let [탭, 탭변경] = useState(0);
    let intervalId;
    let TimeOut;

    useEffect(() => {
        //mount 될 때와 업데이트 될 때 실행됨.
        if (!shoes) {
            return <div>상품 정보를 찾을 수 없습니다.</div>;
        }

        intervalId = setInterval(() => {
            setAlertCnt((alertCnt) => alertCnt - 1);
        }, 1000);

        TimeOut = setTimeout(() => {
            setAlert(false);
        }, 2000);

        return () => {
            // 여기 작성되는 코드는 useEffet가 실행되기 전에 실행할 때 사용함.
            //클린업 코드 사용할 때
            clearTimeout(TimeOut);
            clearInterval(intervalId);
        };
    }, [shoes]);

    let [count, setCount] = useState(0);

    const { title, content, price, img } = shoes;
    return (
        <>
            <div className="container">
                {alert && <div className="alert alert-warning">{alertCnt}초 이내 구매시 할인</div>}
                <DivTag>
                    <YellowBtn
                        bg="blue"
                        onClick={() => {
                            setCount(count + 1);
                        }}
                    >
                        버튼입니다
                    </YellowBtn>
                </DivTag>
                {count}
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={
                                id >= 1 && id <= 9
                                    ? 'https://codingapple1.github.io/shop/shoes' + id + '.jpg'
                                    : process.env.PUBLIC_URL + '/' + img
                            }
                            width="80%"
                            alt="이미지"
                        />
                    </div>
                    <div className="col-md-6">
                        <h4>상품명: {title}</h4>
                        <p>상품정보: {content}</p>
                        <p>상품가격: {price}</p>
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                dispactch(addItem({ id: id, name: title, count: 1 }));
                            }}
                        >
                            주문하기
                        </button>
                    </div>
                </div>
            </div>
            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link
                        eventKey="link0"
                        onClick={() => {
                            탭변경(0);
                        }}
                    >
                        내용
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey="link1"
                        onClick={() => {
                            탭변경(1);
                        }}
                    >
                        배송안내
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey="link2"
                        onClick={() => {
                            탭변경(2);
                        }}
                    >
                        환불안내
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent 탭={탭} />
        </>
    );
}

// 구조분해 할당
function TabContent({ 탭 }) {
    let [fade, setFade] = useState('');
    useEffect(() => {
        let fadeIn = setTimeout(() => {
            setFade('end');
        }, 50);

        return () => {
            clearTimeout(fadeIn);
            setFade('');
        };
    }, [탭]);

    //automatic batching 이라면... state 변경함수를 쓸 때마다 재렌더링을 시켜줌.

    return (
        <div className={`start${fade}`}>
            {[<div>내용이에요</div>, <div>배송받고 싶음?</div>, <div>환불받고 싶음?</div>][탭]}
        </div>
    );
}

let YellowBtn = styled.button`
    background: ${(props) => props.bg};
    color: ${(props) => (props.bg == 'blue' ? 'white' : 'black')};
    padding: 10px;
`;

//기존 스타일 참조하는 법

//html 구조가 복잡해지게 되면 js 파일이 매우 복잡해짐

let DivTag = styled.div`
    background: grey;
    padding: 20px;
`;
export default Detail;
