import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  ListItemText,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
  Paper,
  IconButton,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Navbar from '../../../../Components/layouts/navbar/Navbar';
import { useDeleteTrial, useTrialDetails, useUpdateTrial } from '../../Custom Hooks/useTrialAcademy';
import { convertTo12HourFormat } from '../../../common/functions/covertTime';
import Skelton_profile from '../../../../Pages/Skelton_profile';
import PlayersCard from './PlayersCard';
import CancelTrialModal from './CancelTrialModal';

const TrialDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen,setIsOpen] = useState(false)

  const { id } = useParams();
  const {data:trial, isLoading,isError} = useTrialDetails(id)

  const navigate = useNavigate();
  const closeUpdateModal = ()=>{
      setIsOpen(false)
  }

  const updateTrialMutation = useUpdateTrial(id)
  const deleteTrialMutation = useDeleteTrial(id) 

  const trialDate = trial?.trial_date ?  new Date(trial?.trial_date).toDateString() : trial?.trial_date
  const deadline = trial?.deadline ? new Date(trial?.deadline).toDateString() : trial?.deadline
  const trialTime = trial?.trial_time ? convertTo12HourFormat(trial?.trial_time) : trial?.trial_time
  const isTrialOver = new Date(trial?.trial_date) < new Date()

  const formik = useFormik({
    initialValues: {
      name: trial?.name || '',
      venue: trial?.venue || '',
      location: trial?.location || '',
      state: trial?.state || '',
      district: trial?.district || '',
      description: trial?.description || '',
      trial_date: trial?.trial_date || '',
      trial_time: trial?.trial_time || '',
      deadline: trial?.deadline || '',
      is_participant_limit: trial?.is_participant_limit || false,
      total_participant_limit: trial?.total_participant_limit || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      venue: Yup.string().required('Venue is required'),
      location: Yup.string().required('Location is required'),
      state: Yup.string().required('State is required'),
      district: Yup.string().required('District is required'),
      trial_date: Yup.date().required('Trial date is required'),
      trial_time: Yup.string().required('Trial time is required'),
      deadline: Yup.date().required('Deadline is required'),
      total_participant_limit: Yup.number()
      .when('is_participant_limit', {
        is: true,
        then:()=> Yup.number()
          .required('Participant limit is required')
          .positive('Limit must be positive')
          .integer('Limit must be an integer')
          .test(
            'is-greater-than-player-count',
            'Participant limit must be greater than or equal to the current number of registered players',
            function (value) {
              const { player_count } = trial; 
              return value >= player_count;
            }
          ),
        otherwise:()=> Yup.mixed().notRequired(),
      }),
    }),
    onSubmit: (values) => {
        console.log(values,'hai');
        if (!values.is_participant_limit){
            values.total_participant_limit = null
        }
        delete values.image
        updateTrialMutation.mutate(values);
        setIsEditing(false);
    },
  });


  useEffect(() => {
    if (isEditing) {
      formik.setValues(trial);
    } else {
      formik.resetForm();
    }
  }, [isEditing, trial]);

  const handleCancel = (reason) => {
    console.log(reason, '=============================')
    deleteTrialMutation.mutate(reason)
    navigate('/academy/list_trials')
  };

  if (!trial) return  <Skelton_profile/> 
  if (isLoading) return  <Skelton_profile/> 
  if (isError) return <Navigate to={'/academy/list_trials'}/>
  console.log(trial);
  return (
    <>
      <Navbar academy={true} />
      <Container sx={{ mt: 7, mb: 5 }}>
        {/* <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBack />
        </IconButton> */}
        <Card sx={{ mt: 4 }}>
          <CardMedia
            component="img"
            image={trial.image ? `${baseUrl}${trial.image}` : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'}
            alt="Trial Poster"
            sx={{ objectFit: 'fill',maxHeight:500 }}
          />
          <CardContent>
            {isEditing ? (
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                  <TextField
                      label="Name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      margin="normal"
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                     <TextField
                      label="Venue"
                      name="venue"
                      value={formik.values.venue}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      margin="normal"
                      error={formik.touched.venue && Boolean(formik.errors.venue)}
                      helperText={formik.touched.venue && formik.errors.venue}
                    />
                    <TextField
                      label="Location"
                      name="location"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      margin="normal"
                      error={formik.touched.location && Boolean(formik.errors.location)}
                      helperText={formik.touched.location && formik.errors.location}
                    />
                    <TextField
                      label="State"
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      margin="normal"
                      error={formik.touched.state && Boolean(formik.errors.state)}
                      helperText={formik.touched.state && formik.errors.state}
                    />
                    <TextField
                      label="District"
                      name="district"
                      value={formik.values.district}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      margin="normal"
                      error={formik.touched.district && Boolean(formik.errors.district)}
                      helperText={formik.touched.district && formik.errors.district}
                    />
                    <TextField
                      label="Description"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      multiline
                      rows={4}
                      fullWidth
                      margin="normal"
                      error={formik.touched.description && Boolean(formik.errors.description)}
                      helperText={formik.touched.description && formik.errors.description}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Trial Date"
                      name="trial_date"
                      type="date"
                      value={formik.values.trial_date}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      error={formik.touched.trial_date && Boolean(formik.errors.trial_date)}
                      helperText={formik.touched.trial_date && formik.errors.trial_date}
                    />
                    <TextField
                      label="Trial Time"
                      name="trial_time"
                      type="time"
                      value={formik.values.trial_time}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      error={formik.touched.trial_time && Boolean(formik.errors.trial_time)}
                      helperText={formik.touched.trial_time && formik.errors.trial_time}
                    />
                    <TextField
                      label="Deadline"
                      name="deadline"
                      type="date"
                      value={formik.values.deadline}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      error={formik.touched.deadline && Boolean(formik.errors.deadline)}
                      helperText={formik.touched.deadline && formik.errors.deadline}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formik.values.is_participant_limit}
                          onChange={formik.handleChange}
                          name="is_participant_limit"
                          onBlur={formik.handleBlur}
                        />
                      }
                      label="Participant Limit"
                    />
                    {formik.values.is_participant_limit && (
                      <TextField
                        label="Participant Limit"
                        name="total_participant_limit"
                        type="number"
                        value={formik.values.total_participant_limit}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        error={formik.touched.total_participant_limit && Boolean(formik.errors.total_participant_limit)}
                        helperText={formik.touched.total_participant_limit && formik.errors.total_participant_limit}
                      />
                    )}
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button variant="contained" color="primary" type='submit'>
                    Update
                  </Button>
                  <Button variant="contained" color="inherit" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </Box>
              </form>
            ) : (
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
                        <strong className='text-slate-600'>Registered players:</strong> {trial.player_count }
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
                {
                     !isTrialOver &&
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                        Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={()=>setIsOpen(true)}>
                        Cancel Trial
                    </Button>
                    </Box>
                }
                {
                  trial.player_count > 0 && <PlayersCard id={id} count={trial.player_count} />
                }
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
        <CancelTrialModal isOpen={isOpen} closeModal={closeUpdateModal} current={trial} handleCancel={handleCancel}/>
    </>
  );
};

export default TrialDetails;
