import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
    name: 'user',
    initialState: { name: 'kim', age: 20 },

    //reducers 안에 있는 내용들을 'action' 이라고 부름

    reducers: {
        changeName(state) {
            state.name = 'park';
        },
        changeAge(state, number) {
            state.age += number.payload;
            //payload 화물 이런 뜻임.
        },
        // 기존 state가 필요하면 reducers의 안의 함수 안에 state 라고 인자를 넣어주면 됨.
    },
});

export const { changeName, changeAge } = user.actions;

export default user;
