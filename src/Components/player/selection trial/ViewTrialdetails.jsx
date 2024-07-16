import React, { useEffect, useState } from 'react'
import { useTrialDetails } from '../../academy/Custom Hooks/useTrialAcademy'
import { Navigate, useParams,Link } from 'react-router-dom'
import {
    Box,
    Button,
    Typography,
    ListItemText,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Container,
    Paper,
  } from '@mui/material';
import Navbar from '../../layouts/navbar/Navbar';
import Skelton_profile from '../../../Pages/Skelton_profile';
import { convertTo12HourFormat } from '../../common/functions/covertTime';
import userApi from '../../../api/axiosconfig';
import { stripTime } from '../../common/functions/stripTime';
import { baseUrl } from '../../../api/api';


const ViewTrialdetails = () => {
  const { id } = useParams()
  const [unique_id,setUnique_id] = useState('')
  const [status,setStatus] = useState('')
  const {data:trial, isLoading,isError} = useTrialDetails(id) // fetch trial using custom hook

  // to fetch current player details (for uniqueid and status) 
  const fetchPlayerinTrial = async ()=>{
    try{
      const res = await userApi.get(`trial_player_details/${id}`)
      console.log(res);
      if (res.status === 200){
        setStatus(res.data.status)
        setUnique_id(res.data.unique_id) 
      }
    }catch(error){
      console.log(error,'error fetching');
    }
  } 

  useEffect(() => {
    fetchPlayerinTrial()
  }, [])

  console.log(trial,id);
  //  to show dates in a user friendly format
  const trialDate = trial?.trial_date ?  new Date(trial?.trial_date).toDateString() : trial?.trial_date
  const deadline = trial?.deadline ? new Date(trial?.deadline).toDateString() : trial?.deadline
  const trialTime = trial?.trial_time ? convertTo12HourFormat(trial?.trial_time) : trial?.trial_time
  const today = new Date()

  if (isLoading) return <> <Skelton_profile/> </>
  if (isError) return <Navigate to={'/home'} />

  //  stript time to get a proper comparisson result
  const strippedDate = stripTime(today)
  const deadlineStripped = stripTime(new Date(trial.deadline))
  console.log(today,deadline,today>deadline, new Date(trial.deadline),strippedDate,deadlineStripped);
  return (
    <>
    <Navbar />
     <Container sx={{ mt: 7, mb: 5 }}>
        <Card sx={{ mt: 4 }}>
          <CardMedia
            component="img"
            image={trial?.image ? `${baseUrl}${trial?.image}` : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'}
            alt="Trial Poster"
            sx={{ objectFit: 'fill',maxHeight:500 }}
          />
          <CardContent>
              <Box sx={{ p: 2 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Typography  variant="h4" color={'rgb(30 136 229)'} textTransform={'capitalize'}  gutterBottom>
                      {trial.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom sx={{wordBreak:'break-word',overflowWrap:'break-word',maxWidth:430}}>
                        Academy: <strong className='text-slate-600'>{trial.academy_details.username}</strong>  
                    </Typography>
                    <Typography variant="body1" gutterBottom sx={{wordBreak:'break-word',overflowWrap:'break-word',maxWidth:430}}>
                        Venue: <strong className='text-slate-600'>{trial.venue}</strong>  
                    </Typography>
                    <Typography variant="body1" gutterBottom sx={{wordBreak:'break-word',overflowWrap:'break-word',maxWidth:430}}>
                        Location: <strong className='text-slate-600'>{trial.location}</strong> 
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        State: <strong className='text-slate-600'>{trial.state}</strong> 
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        District: <strong className='text-slate-600'>{trial.district}</strong> 
                    </Typography>
                    {
                        trial.description && 
                        <Typography variant="body1" gutterBottom>
                            Description: <strong className='text-slate-600'> {trial.description}</strong>
                        </Typography>
                    }
                    {/* show addition requirements if sepcified in trial */}
                    {
                        trial.additional_requirements.length > 0 && 
                        <>
                            <Typography variant="body1">
                            Additional Requirements:
                            </Typography>
                            {trial.additional_requirements.map((obj,index) => (
                                <div key={index}>
                                    <ListItemText  secondary={`${index+1 }. ${obj.requirement}`} />
                                </div>
                            ))}
                        </>
                    }
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                      <Typography variant="body1" gutterBottom>
                        <strong className='text-slate-600'>Trial Date:</strong> {trialDate}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong className='text-slate-600'>Trial Time:</strong> {trialTime}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong className='text-slate-600'>Deadline:</strong> {deadline}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong className='text-slate-600'>Registered Players:</strong> {trial.player_count}
                      </Typography> 
                      <Typography variant="body1" gutterBottom>
                        <strong className='text-slate-600'>Participant Limit:</strong> {trial.is_participant_limit ? trial.total_participant_limit : 'No Limit'}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong className='text-slate-600'>Registration Fee:</strong> {trial.is_registration_fee ?<> ₹{trial.registration_fee} </>: 'Free'}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>

                  {/* if already registered show unique id and status */}
                {
                  unique_id ? (
                    <div className='border-2 p-4 font-bold flex flex-col items-center text-lg'>
                      <div>ID: <span className='text-blue-500 font-bold text-xl'>{unique_id}</span></div>
                      <span className={`capitalize ${status === 'selected' ? 'text-green-500' : status ==='rejected' ? 'text-red-500':'text-yellow-500'} `}> {status} </span>
                    </div>
                  ) : (
                    <>
                    {/* if  there is no participant limit show register button */}
                      {!trial.is_participant_limit ? (
                        <Link to={`/register_trial/${id}`}>
                          <Button variant="contained" color="primary">
                            Register
                          </Button>
                        </Link>
                      ) : (
                        // if  total players in trial and deadline is lower that neede then show the button
                        trial.total_participant_limit > trial.player_count && strippedDate <= deadlineStripped ? (
                          <Link to={`/register_trial/${id}`}>
                            <Button variant="contained" color="primary">
                              Register
                            </Button>
                          </Link>
                        ) : (
                          //  if deadline is more than todays date hide button
                          strippedDate > deadlineStripped ? (
                            <>Deadline Over</>
                          ) : (
                            // if participant count more than registered players count hide button
                            <>Slot Full</>
                          )
                        )
                      )}
                    </>
                  )
                }
                </Box>
              </Box>
          </CardContent>
        </Card>
      </Container>
      </>
  )
}

export default ViewTrialdetails
