import axios  from "axios";
import { useNavigate } from "react-router-dom";

// to create an instance of axios with baseurl
const userApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})


userApi.interceptors.request.use(
    
    (config) =>{
        console.log('inside request intercepters');
        const token = localStorage.getItem('playerToken')
        console.log(!!token,'token in request');
        if (token){
            config.headers.Authorization = `Bearer ${token}`
        }
        console.log('config');
        return config
    },(error)=>{
        console.log('in request error 00000000000000000000000000000000');
        return Promise.reject(error)
    }
)

userApi.interceptors.response.use(
    (response) =>{
        console.log('inside response interceptors ',response.data);
        return response 
    },
    async (error) =>{
        console.log('inside reposcne error',error.config);
        const previosRequest = error.config
        console.log(error.response,'err response 0000000000000000000000000000000000000000111');
        if (error.response && error.response.status === 401 && !previosRequest._retry){
            previosRequest._retry = true

            const refreshToken = localStorage.getItem('playerRefresh')
            if (refreshToken){
                try {
                    console.log('1');
                    const res = await userApi.post('api/token/refresh/',{refresh:refreshToken})
                    console.log(res.data,'2');
                    const access = res.data?.access
                    console.log('3');
                    console.log(res.data.refresh, localStorage.getItem('playerRefresh'));
                    localStorage.setItem('playerToken',access)
                    localStorage.setItem('playerRefresh',res.data.refresh)
                    userApi.defaults.headers.common.Authorization = `Bearer ${access}`
                    previosRequest.headers.Authorization = `Bearer ${access}`
                    return userApi(previosRequest)
                } catch (err){
                    console.log(err,'token refreshh error ');
                    // localStorage.clear()
                    // const navigate = useNavigate()
                    // navigate('/')
                    return Promise.reject(err)
                }
            }
        }
        return Promise.reject(error.response);
        }   
)

export default userApi