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


const ViewTrialdetails = () => {
  const { id } = useParams()
  const [unique_id,setUnique_id] = useState('')
  const [status,setStatus] = useState('')
  const [count,setCount] = useState(0)
  const {data:trial, isLoading,isError} = useTrialDetails(id)

  const fetchPlayerinTrial = async ()=>{
    try{
      const res = await userApi.get(`player_exist/${id}`)
      console.log(res);
      if (res.status === 200){
        setStatus(res.data.status)
        setUnique_id(res.data.unique_id) 
      }
      setCount(res.data.count)
    }catch(error){
      console.log(error,'error fetching');
    }
  } 

  useEffect(() => {
    fetchPlayerinTrial()
  }, [])

  console.log(trial,id);
  const trialDate = trial?.trial_date ?  new Date(trial?.trial_date).toDateString() : trial?.trial_date
  const deadline = trial?.deadline ? new Date(trial?.deadline).toDateString() : trial?.deadline
  const trialTime = trial?.trial_time ? convertTo12HourFormat(trial?.trial_time) : trial?.trial_time
  const today = new Date()

  if (isLoading) return <> <Skelton_profile/> </>
  if (isError) return <Navigate to={'/home'} />

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
            image={trial?.image ? trial?.image : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'}
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
                        <strong className='text-slate-600'>Registered Players:</strong> {count}
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
                {
                  unique_id ? (
                    <div className='border-2 p-4 font-bold flex flex-col items-center text-lg'>
                      <div>ID: <span className='text-blue-500 font-bold text-xl'>{unique_id}</span></div>
                      <span className='capitalize'>{status}</span>
                    </div>
                  ) : (
                    <>
                      {!trial.is_participant_limit ? (
                        <Link to={`/register_trial/${id}`}>
                          <Button variant="contained" color="primary">
                            Register
                          </Button>
                        </Link>
                      ) : (
                        trial.total_participant_limit > count && strippedDate <= deadlineStripped ? (
                          <Link to={`/register_trial/${id}`}>
                            <Button variant="contained" color="primary">
                              Register
                            </Button>
                          </Link>
                        ) : (
                          strippedDate > deadlineStripped ? (
                            <>Deadline Over</>
                          ) : (
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
