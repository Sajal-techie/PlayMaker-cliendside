import { useMutation, useQuery, useQueryClient } from 'react-query'
import userApi from '../../../api/axiosconfig'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastMessage } from '../../common/functions/showToastMessage';


const fetchTrials = async ()=>{
    try{
        const response = await userApi.get('trial')
        console.log(response,'inn fetch trials');
        return response.data
    }catch(error){
        console.log(error);
        if (error.status === 403){
            showToastMessage(403,error.data?.detail)
            throw new Error(error.data?.detail)
        }else{
            showToastMessage(400,"server error try again later")
            throw new Error("Server Error") 
        }
    }
}

export const useTrialAcademy = ()=>{
    return useQuery('trials',fetchTrials,{
        
    })
}


