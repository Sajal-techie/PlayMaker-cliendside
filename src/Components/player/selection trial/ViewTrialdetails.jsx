import React from 'react'
import { useTrialDetails } from '../../academy/Custom Hooks/useTrialAcademy'
import { useParams } from 'react-router-dom'
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


const ViewTrialdetails = () => {
    const { id } = useParams()
    const {data:trial, isLoading,isError} = useTrialDetails(id)
    console.log(trial,id);
    const trialDate = trial?.trial_date ?  new Date(trial?.trial_date).toDateString() : trial?.trial_date
  const deadline = trial?.deadline ? new Date(trial?.deadline).toDateString() : trial?.deadline
  const trialTime = trial?.trial_time ? convertTo12HourFormat(trial?.trial_time) : trial?.trial_time
  if (isLoading) return <> <Skelton_profile/> </>
  
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
                    <Typography  variant="h4" color={'rgb(99 102 291)'} textTransform={'capitalize'}  gutterBottom>
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
                        <strong className='text-slate-600'>Participant Limit:</strong> {trial.is_participant_limit ? trial.total_participant_limit : 'No Limit'}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong className='text-slate-600'>Registration Fee:</strong> {trial.is_registration_fee ?<> ₹{trial.registration_fee} </>: 'Free'}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Button variant="contained" color="primary" onClick={''}>
                        Register 
                    </Button>
                </Box>
              </Box>
          </CardContent>
        </Card>
      </Container>
      </>
  )
}

export default ViewTrialdetails
