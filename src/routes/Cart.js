import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeAge, changeName } from '../store/userSlice';
import { addCount, miunsCount, deleteItem } from '../store/itemSlice';
import { memo, useState } from 'react';

let Child = memo(function () {
    console.log('재렌더링');
    return <div>자식임</div>;
});

//memo 는 특정 상황에서만 재렌더링을 막아줌.
//props가 변화할 때만 재렌더링 됨. memo로 감싸놓은 거는 항상 비교작업을 해서
// props가 길고 복잡하면 비교 기간도 김.

function Cart() {
    const Dispatch = useDispatch();

    const state = useSelector((state) => {
        return state;
    });

    const { user, item } = state;
    let [count, setCount] = useState();
    //  let useDispatch() -> store 에게 state변경을 요청함. ;
    // useSelector 에서는 반드시 () 안에 state 로 인자를 넣어야 함.
    // return state; 에는 state.user 으로 원하는 state만 가져올 수 있음.
    // state가 공유가 필요없는 state이면 컴포넌트 안에서 useState를 만들어서 사용하는 게 좋음.

    return (
        <>
            <Child count={{ count }}></Child>
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                +버튼
            </button>
            <h1>
                {user.name}의 장바구니 {user.age}의 나이
            </h1>
            <button
                onClick={() => {
                    Dispatch(changeAge(100));
                }}
            >
                버튼
            </button>
            <Table>
                <thead>
                    {/* tr 가로칸을 뜻함  */}
                    {/* td=> 열을 뜻함 */}
                    {/* th -> 표 제목 */}
                    <tr>
                        <th>상품번호</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {item.map((item, index) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        Dispatch(miunsCount(index));
                                    }}
                                >
                                    -
                                </button>
                                <button
                                    onClick={() => {
                                        Dispatch(addCount(index));
                                    }}
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => {
                                        Dispatch(deleteItem(index));
                                    }}
                                >
                                    상품 삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Cart;
