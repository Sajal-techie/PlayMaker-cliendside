import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name:'admin',
    initialState:{
        isSidebarOpen:false
    },
    reducers:{
        toggleSidebar: (state,action) =>{
            state.isSidebarOpen = action.payload
        }
    }
})

export const {toggleSidebar} = adminSlice.actions
export default adminSlice.reducer