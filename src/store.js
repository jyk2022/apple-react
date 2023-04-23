import { configureStore, createSlice } from '@reduxjs/toolkit';
import item from './store/itemSlice';
import user from './store/userSlice';

export default configureStore({
    reducer: {
        user: user.reducer,
        item: item.reducer,
    },
});
