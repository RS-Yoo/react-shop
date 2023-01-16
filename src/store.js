import { configureStore, createSlice } from '@reduxjs/toolkit'
import item from './store/itemSlice';

let user = createSlice({
    name: 'user',
    initialState: 'kim'
})

let stock = createSlice({
    name: 'stock',
    initialState: [10, 11, 12]
})

export default configureStore({
  reducer: { 
    user: user.reducer,
    stock: stock.reducer,
    item: item.reducer
  }
})