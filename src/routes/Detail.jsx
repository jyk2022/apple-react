import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function Detail(props) {
    let { id } = useParams();
    let shoes = props.shoes.find((product) => {
        return product.id == id;
    });

    let [alertCnt, setAlertCnt] = useState(2);
    let [alert, setalert] = useState(true);
    let intervalId;

    useEffect(() => {
        //mount 될 때와 업데이트 될 때 실행됨.
        if (!shoes) {
            return <div>상품 정보를 찾을 수 없습니다.</div>;
        }

        intervalId = setInterval(() => {
            setAlertCnt((alert) => alert - 1);
        }, 1000);

        setTimeout(() => {
            setalert(false);
        }, 2000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    let [count, setCount] = useState(0);

    const { title, content, price, img } = shoes;
    return (
        <div className="container">
            {alert == true ? <div className="alert alert-warnig"> {alertCnt}초 이내 구매시 할인</div> : null}
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
                    <img src={process.env.PUBLIC_URL + '/' + img} width="80%" alt="이미지" />
                </div>
                <div className="col-md-6">
                    <h4>상품명: {title}</h4>
                    <p>상품정보: {content}</p>
                    <p>상품가격: {price}</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
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
