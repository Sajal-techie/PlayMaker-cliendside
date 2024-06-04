import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../api/api";
// import axios from "axios";
import userApi from "../../api/axiosconfig";

export const login = createAsyncThunk(
    "auth/login",
    async (credentials,thunkAPI) => {
        try{
            const response = await userApi.post(`login`, credentials);
            console.log(response.data);
            if (response.data.status === 400){
                console.log(response.data.message);
                return thunkAPI.rejectWithValue(response.data)
            }
            const responseToken = await userApi.post(`api/token/`,credentials)
            console.log('tojend is' ,responseToken.data);
            if (responseToken?.data?.access){
                localStorage.setItem('access',responseToken.data.access)
                localStorage.setItem('refresh',responseToken.data.refresh)
                localStorage.setItem('role',response.data.role)
                localStorage.setItem('user',response.data.user)
                return response.data
            }
            const res = {'message':'Authentication error'}
            return res
        } catch (error){
            console.log(error,'555555555555555' ,thunkAPI.rejectWithValue(error.data));
            return thunkAPI.rejectWithValue(error.data)

        }
    } 
) 

export const signup = createAsyncThunk(
    "auth/signup",
    async (credentials,thunkAPI) => {
        console.log(credentials);
        try{
            const response = await userApi.post(`${baseUrl}signup`, credentials,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data,'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh\n',response.data.status);
            if (response.data.status === 400 ){
                console.log(response.data.message);
                return thunkAPI.rejectWithValue(response.data)
            }

            return response.data
        } catch (error){

            console.log(error,'555555555555555' ,thunkAPI.rejectWithValue(error));
            return thunkAPI.rejectWithValue(error.data)
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: localStorage.getItem('user'),
        token: null,
        loading: false,
        error: null,
        role: localStorage.getItem('role'),
        message: null
    },
    reducers: {
        // login: (state, action) => {
        //     state.user = action.payload
        // },
        logout: (state) => {
            state.user = null
            state.role = null
            localStorage.clear()
            console.log('insidde logout');
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
        .addCase(login.pending, (state)=>{
            state.loading = true
            console.log('in pending, ', state.loading,state.user);
        })
        .addCase(login.fulfilled, (state,action)=>{
            state.loading = false
            state.user = action.payload.user
            state.token = action.payload.token
            state.role = action.payload.role
            state.message = action.payload.message
            console.log(action.payload,'in fulfilled','message = ',state.message,state.loading);

        })
        .addCase(login.rejected, (state,action)=>{
            state.loading = false
            state.message = action.payload.message
            console.log(action.payload,'in rejected, ', state.loading,state.message);
        })
    }
})

export const {logout} = authSlice.actions
export default authSlice.reducer