import { createSlice } from '@reduxjs/toolkit';

let item = createSlice({
    name: 'item',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 },
    ],
    reducers: {
        addCount(state, action) {
            state[action.payload].count++;
        },
        miunsCount(state, action) {
            if (state[action.payload].count !== 0) {
                state[action.payload].count--;
            }
        },
        addItem(state, action) {
            state.push(action.payload);
        },
        deleteItem(state, action) {
            const index = state.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
    },
});

export const { addCount, addItem, miunsCount, deleteItem } = item.actions;

export default item;
