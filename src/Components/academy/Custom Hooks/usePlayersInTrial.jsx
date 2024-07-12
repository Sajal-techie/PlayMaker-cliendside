import { QueriesObserver, useQuery, useQueryClient } from "react-query";
import userApi from "../../../api/axiosconfig"


const fetchPlayersInTrial = async (id)=>{
    try{
        const response = await userApi.get(`players_in_trial_list/${id}`)
        console.log(response, ' in player sin trial ');
        return response.data
    }catch(error){
        console.log(error, 'error listing players');
    }
}


export const usePlayersInTrial = (id)=>{
    return useQuery(['playerlist',id],()=>fetchPlayersInTrial(id),{
        enabled: !!id,
        staleTime: 10 * (60 * 1000),
    })
}