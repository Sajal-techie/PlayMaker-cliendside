import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { showToastMessage } from '../../common/functions/showToastMessage'
import userApi from '../../../api/axiosconfig'

const PaymentFailed = () => {
    const navigate = useNavigate()
    const location = useLocation()
     
    useEffect(()=>{
        const queryParams = new URLSearchParams(location.search)
        const registraionId = queryParams.get('registrationId')
        const trialId = queryParams.get('trialId')
        console.log('in payment failed,',registraionId,trialId)

        // to delete registration if payment is cancelled 
        const deleteRegsitration = async ()=>{
            try{
                const res = await userApi.delete(`player_trial/${registraionId}`)
                console.log(res,'deleted sucesful');
            }catch(error){
                console.log(error, 'error deleting trial');
            }
        }
        
        deleteRegsitration()
        showToastMessage(400,'payment cancelled try registration again')
        navigate(`/trial_details/${trialId}`)
    },[])
  return (
    <div>
      Payment failed . Redirecting 
    </div>
  )
}

export default PaymentFailed
