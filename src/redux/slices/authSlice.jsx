import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../api/axiosconfig";

export const login = createAsyncThunk(
    "auth/login",
    async (credentials,thunkAPI) => {
        try{
        console.log(!!userApi.defaults.headers.common['Authorization']);
            const response = await userApi.post(`login`, credentials);
            console.log(response.data);
            // if (response.data.status === 400 || response.data===400){
            //     console.log(response.data.message,' in 5400');
            //     return thunkAPI.rejectWithValue(response.data)
            // }
            // if (response.data.status === 403){
            //     console.log(response.data);
            //     return thunkAPI.rejectWithValue(response.data)
            // }
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
            console.log(error,'555555555555555' );
            if (error?.code==='ERR_NETWORK'){
                return thunkAPI.rejectWithValue(error)
            }
            return thunkAPI.rejectWithValue(error.data)
        }
    } 
) 

export const signup = createAsyncThunk(
    "auth/signup",
    async (credentials,thunkAPI) => {
        console.log(credentials);
        try{
            const response = await userApi.post(`signup`, credentials,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data,'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh\n');
            // if (response.data.status === 400 ){
            //     console.log(response.data.message);
            //     return thunkAPI.rejectWithValue(response.data)
            // }
            // if (response.data.status >= 500){
            //     console.log(response.data, ' server error');
            //     return thunkAPI.rejectWithValue(response.data)
            // }
            return response.data
        } catch (error){
            console.log(error,'555555555555555');
            if (error==="Internal Server Error"){
                return thunkAPI.rejectWithValue(error)
            }
            return thunkAPI.rejectWithValue(error.data)
        }
    }
)
    export const logout = createAsyncThunk (
        "auth/logout", 
        async () => {
            try{
                const refresh = localStorage.getItem('refresh')
                console.log(refresh,'refresh in logout');
                const response = await userApi.post('logout',{refresh})
                console.log(response);
                console.log(userApi.defaults.headers.common['Authorization'],'\nheader');
                delete userApi.defaults.headers.common['Authorization'];
                console.log(userApi.defaults.headers.common['Authorization'],'\nheader after');
                localStorage.clear()
                return response.data
            } catch(error){
                console.log(error);
                delete userApi.defaults.headers.common['Authorization'];
                localStorage.clear()
                return error
            }
        }
    )
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: localStorage.getItem('user'),
        loading: false,
        error: null,
        role: localStorage.getItem('role'),
        dob:null,
        message: null,
        is_access: false,
        profile:null,
        user_id: null,
        notificationCount: 0
    },
    reducers: {
        toggleOtpAcess: (state,action) => {
            state.is_access = action.payload
        },
        googleSignin:(state,action)=>{
            state.user = action.payload.username
            state.role = action.payload.role
            state.dob = action.payload.dob
            state.user_id = action.payload.user_id
            state.profile = action.payload.profile_photo
            state.notificationCount = action.payload.notification_count
            console.log(action, state.user,state.role);
        },
        updateProfilePhoto:(state,action)=>{
            console.log(action, action.profile_photo);
            state.profile = action.payload
        },
        updateNotificationCount:(state,action)=>{
            console.log(action, state, 'notification count');
            state.notificationCount = state.notificationCount + action.payload
            if (state.notificationCount < 0){
                state.notificationCount = 0
            }
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
            state.message = action?.payload?.message
            console.log(action?.payload,'in fulfilled','message = ',state?.message,state?.loading);

        })
        .addCase(signup.rejected, (state,action)=>{
            state.loading = false
            state.message = action?.payload?.message ? action?.payload?.message : action?.payload
            console.log(action?.payload,'in reected', action,', message = ',state?.message,state?.loading);
            // alert(state.message)
        })
        .addCase(login.pending, (state)=>{
            state.loading = true
            console.log('in pending, ', state.loading,state.user);
        })
        .addCase(login.fulfilled, (state,action)=>{
            state.loading = false
            state.user = action?.payload?.user
            state.role = action?.payload?.role
            state.message = action?.payload?.message
            state.dob = action?.payload?.dob
            state.user_id = action?.payload?.user_id
            state.profile = action?.payload?.profile_photo
            state.notificationCount = action?.payload?.notification_count
            console.log(action.payload,'in fulfilled','message = ',state.message,state.loading);

        })
        .addCase(login.rejected, (state,action)=>{
            state.loading = false
            state.message = action?.payload?.message
            console.log(action?.payload,'in rejected, ', state?.loading,state.message);
        })
        .addCase(logout.pending ,(state)=>{
            state.loading = true
            console.log('inpending lgout');
        })
        .addCase(logout.fulfilled, (state,action)=>{
            console.log(action, 'infulflled logut');
            state.user = null
            state.loading = false
            state.role = null
            state.dob = null
            state.user_id = null
            state.profile=null
            state.error=null
            state.message=null
            state.notificationCount=0
        })
        .addCase(logout.rejected, (state,action)=>{
            console.log(action.payload,'logout rejected');
            state.user = null 
            state.loading= false
            state.role= null
        })
    }
})

export const {toggleOtpAcess,googleSignin,updateProfilePhoto,updateNotificationCount} = authSlice.actions
export default authSlice.reducer