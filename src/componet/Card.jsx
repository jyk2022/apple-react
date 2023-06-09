import { useNavigate } from 'react-router-dom';

function Card(props) {
    let navi = useNavigate();
    const { title, content, price, img, id } = props.shoes;
    return (
        <>
            <div
                className="col-md-4"
                onClick={() => {
                    navi(`/Detail/${id}`);
                }}
            >
                <img
                    src={
                        id >= 1 && id <= 8
                            ? 'https://codingapple1.github.io/shop/shoes' + id + '.jpg'
                            : process.env.PUBLIC_URL + '/' + img
                    }
                    width="80%"
                    alt="이미지"
                />
                <h4>상품명: {title}</h4>
                <p>상품정보: {content}</p>
                <p>상품가격: {price}</p>
            </div>
        </>
    );
}

export default Card;
