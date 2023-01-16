import { createSlice } from "@reduxjs/toolkit";

let item = createSlice({
    name: 'item',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ],
    reducers: {
        changeCount(s, action) {
            s[action.payload].count += 1;
        },
        addItem(s, action) {
            s.push(action.payload);
        }
    }  
})

export let { changeCount, addItem } = item.actions;

export default item;