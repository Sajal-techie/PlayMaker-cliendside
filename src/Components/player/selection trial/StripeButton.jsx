import { loadStripe } from "@stripe/stripe-js";
import userApi from "../../../api/axiosconfig";
import { Button } from "@mui/material";

const stripePromise = loadStripe(import.meta.env.REACT_APP_STRIPE_KEY || 'pk_test_51PbymA2Kz50DKZ1p9iPax1hcYrd5RghzVFUtw5PqjM8D4n4tOoBDABb1YIjR2xYFrwkb2mgRVaxcxJgzQsH8hPYt00YMuVWYrY')

const StripeButton = ({id,amount}) => {
    const handleClick = async (event) => {
        try{    
                const stripe = await stripePromise;
                const response = await userApi.post(`create_checkout_session/${id}`);
                console.log(response,stripe);
                const session = response.data;
                const result = await stripe.redirectToCheckout({
                    sessionId: session.id,
                });
                if (result.error) {
                    console.log(result.error.message,'result error');
                }
            
        }catch(error){
            console.log(error, 'entho error');
        }
      };
    return (
        <Button type="submit" variant="contained" color="primary" onClick={handleClick} sx={{py:1,px:3}}>Pay ₹{amount}</Button>
    );
}

export default StripeButton;