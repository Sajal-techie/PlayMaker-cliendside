import { useMutation, useQuery, useQueryClient } from 'react-query'
import userApi from '../../../api/axiosconfig'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetchProfile = async ()=>{
    try{
        const res = await userApi.get('profile')
        return res.data.user_details
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

export const useProfile = () => {
  return useQuery('profile',fetchProfile,{
        staleTime: 10 * (60 * 1000),
  })
}

//  to update about in profile
export const useUpdateAbout = ()=>{
    const queryClient = useQueryClient()
    return useMutation(
        async (updatedData) =>{
            const res = await userApi.put('update_about',updatedData)
            return res
        },
        {
            onSuccess: ()=>{
                queryClient.invalidateQueries('profile')
                console.log('success');
                showToastMessage(200,'About Updated Successfully')
            },
            onError:()=>{
                console.log('error');
                showToastMessage(400,"Error updating About")
            }
        }
    )
}

export const useUpdateDetials = ()=>{
    const queryClient = useQueryClient()
    return useMutation(
        async(updatedData)=>{
            const res =  await userApi.post('profile',updatedData)
            return res
        },
        {
            onSuccess:()=>{
                queryClient.invalidateQueries('profile')
                console.log('succes');
                showToastMessage(200,'User Details updated successfully')
            },
            onError:()=>{
                console.log('error');
                showToastMessage(400, 'Error updating user profile')
            }
        }
    )
}

export const useUpdatePhoto = ()=>{
    const queryClient = useQueryClient()
    return useMutation(
        async({id,formData})=>{
            const res = await userApi.post('update_photo/' + id, formData);
            return res
        },
        {
            onSuccess:()=>{
                queryClient.invalidateQueries('profile')
                console.log('succes');
                showToastMessage(200,'Image updated successfully')
            },
            onError:()=>{
                console.log('error');
                showToastMessage(400, 'Error updating  image')
            }
        }
    )
}

export const useDeletePhoto = ()=>{
    const queryClient = useQueryClient()
    return useMutation(
        async({id,type})=>{
            console.log(id,type);
            const res =  await userApi.delete('delete_photo/'+id, { data: type})
            return res
        },
        {
            onSuccess:()=>{
                queryClient.invalidateQueries('profile')
                console.log('succes');
                showToastMessage(200,'Image deleted successfully')
            },
            onError:()=>{
                console.log('error');
                showToastMessage(400, 'Error Deleting Image')
            }
        }
    )
}

const showToastMessage = (status, message) => {
    console.log(status, message);
    const options = {
        position: 'bottom-right',
        draggable: true,
    }
    if (status===200){
        toast.success(message, options);
    }
    else{
        toast.error(message,options)
    }
  };