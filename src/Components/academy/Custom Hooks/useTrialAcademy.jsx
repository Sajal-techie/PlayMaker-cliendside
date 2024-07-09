import { useMutation, useQuery, useQueryClient } from 'react-query'
import userApi from '../../../api/axiosconfig'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastMessage } from '../../common/functions/showToastMessage';


const fetchTrialsList = async ()=>{
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

const fetchTrialDetails = async (id)=>{
    try{
        const response = await userApi.get(`trial/${id}`)
        console.log(response,'trial details');
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


// custom hook for fetching list of trials
export const useTrialAcademy = ()=>{
    return useQuery('trials',fetchTrialsList,{
        staleTime: 10 * (60 * 1000),
    })
}


//  custom hook for fetching single trial details
export const useTrialDetails = (id) =>{
    console.log(id,'helellee');
    return useQuery(['trial',id],()=>fetchTrialDetails(id),{
        enabled: !!id,
        staleTime: 10 * (60 * 1000),
    })
}


// custom hook to create new trial
export const useCreateNewTrial = () =>{
    const queryClient = useQueryClient()
    return useMutation(
        async (newTrialData) =>{
            const response = await userApi.post('trial',newTrialData)
            return response
        },{
            onSuccess:()=>{
                queryClient.invalidateQueries('trials')
                console.log('added');
                showToastMessage(200,"trial created successfully")
            },
            onError:()=>{
                console.log('errore adading trial');
                showToastMessage(400,"Server error try again later")
            }
        }
    )
}


export const useUpdateTrial = (id) =>{
    const queryClient = useQueryClient()
    return useMutation(
        async (updateTrialData) =>{
            const response = await userApi.put(`trial/${id}`,updateTrialData)
            console.log(response);
            return response.data
        },
        {
            onSuccess:()=>{
                queryClient.invalidateQueries(['trial',id])
                showToastMessage(200,"Trial details updated successfully")
            },
            onError:(error)=>{
                console.log('error updating trial detils',error);
                showToastMessage(400,'Error updating trial')
            }
        }
    )
}


export const useDeleteTrial = (id)=>{
    const queryClient = useQueryClient()
    return useMutation(
        async () =>{
            await userApi.delete(`trial/${id}`)
        },
        {
            onSuccess:()=>{
                queryClient.invalidateQueries('trials')
                showToastMessage(200, 'trial deleted succesfully')
            },
            onError:(error)=>{
                console.log('error dleteing',error);
                showToastMessage(400,'Error deleting trial')
            }
        }
    )
}