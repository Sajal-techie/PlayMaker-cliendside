import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../api/api";
import axios from "axios";

// export const login1 = createAsyncThunk(
//     "auth/login",
//     async (data,thunkAPI) => {
//         try{
//             const response = await axios.post(`${baseUrl}login/`, data);
//             console.log(response.data);
//             return response.data
//         } catch (error){
//             console.log(error);
//         }
//     }
// )

export const signup = createAsyncThunk(
    "auth/signup",
    async (credentials,thunkAPI) => {
        console.log(credentials);
        try{
            const response = await axios.post(`${baseUrl}signup`, credentials);
            console.log(response.data,'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh\n',response.data.status);
            if (response.data.status === 400 ){
                console.log(response.data.message);
                return thunkAPI.rejectWithValue(response.data)
            }

            return response.data
        } catch (error){

            console.log(error, thunkAPI.rejectWithValue(error));
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
        role: null,
        message: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        }
    },
    extraReducers:(builder)=> {
        builder
        .addCase(signup.pending, (state) => {
            state.loading = true
            console.log('in pending, ', state.loading,state.user);
        })
        .addCase(signup.fulfilled, (state,action)=>{
            state.loading = false
            state.message = action.payload.message
            console.log(action.payload,'in fulfilled','message = ',state.message,state.loading);

        })
        .addCase(signup.rejected, (state,action)=>{
            state.loading = false
            state.message = action.payload.message
            console.log(action.payload,'in reected', action,', message = ',state.message,state.loading);
            alert(state.message)

        })
        
    }
})

export const {login,logout} = authSlice.actions
export default authSlice.reducer