import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import userApi from '../../../api/axiosconfig'
import { showToastMessage } from '../../common/functions/showToastMessage'

const PaymentSuccess = () => {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        const queryParams = new URLSearchParams(location.search)
        const registration_id = queryParams.get('registrationId')
        const trialId = queryParams.get('trialId')
        console.log(registration_id,queryParams,trialId,'in payment successs');

        // to confirm registraion after payment is successsfull
        const confirmRegistration =  async ()=>{
            try{
                const res = await userApi.put(`player_trial/${registration_id}`)
                console.log(res,' registraton resone');
                console.log('it is here----------------------------]]]]]]');
                
                showToastMessage(200,'payment successfull registraion completed')
                navigate(`/trial_details/${trialId}`)
            }catch(error){
                console.log(error, ' error in regsitration ');
                showToastMessage(400, ' error confirm regsitraion , please try again later')
                navigate(`/trial_details/${trialId}`)
            }
        }
        
        if (registration_id){
            confirmRegistration()
        }else{
            showToastMessage(400,"Invalid registraion please try again")
            navigate(`/trial_details/${trialId}`)
        }
    },[])
  return (
    <div>
      Processing payment and registraion .....
    </div>
  )
}

export default PaymentSuccess
