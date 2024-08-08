import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Navbar from '../../../Components/layouts/navbar/Navbar';
import {
  Box,
  Button,
  Checkbox,
  colors,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import userApi from '../../../api/axiosconfig';
import all_sports from '../../../api/json data/sports';
import all_states from '../../../api/json data/states_districts';
import { showToastMessage } from '../../common/functions/showToastMessage';
import { useCreateNewTrial } from '../Custom Hooks/useTrialAcademy';


const states = all_states.map((obj)=> obj.state)

const AddTrial = () => {
  const [requirements, setRequirements] = useState([]);
  const [limitChecked, setLimitChecked] = useState(false);
  const [isFeesChecked, setIsFeesChecked] = useState(false);
  const [districts,setDistricts] = useState([])
  const [requirementError,setRequirementError] = useState()

  const addTrial = useCreateNewTrial()
  const navigate = useNavigate()
  
  const formik = useFormik({
    initialValues: {
      sport: '',
      name: '',
      venue: '',
      location: '',
      state: '',
      district: '',
      trial_date: '',
      trial_time: '',
      deadline: '',
      is_participant_limit: false,
      total_participant_limit: '',
      image: '',
      is_registration_fee:false,
      registration_fee: '',
      description: '',
      additionalRequirements: [],
    },
    validationSchema: Yup.object({
      sport: Yup.string().required('Required'),
      name: Yup.string().required('Required'),
      venue: Yup.string().required('Required'),
    //   location: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      district: Yup.string().required('Required'),
      trial_date: Yup.date().required('Required').min(new Date(), 'Trial date must be in the future'),
      trial_time: Yup.string()
        .required('Required')
        .test('is-valid-time', 'Time must be between 6 AM and 6 PM', (value) => {
          const [hour] = value.split(':').map(Number);
          return hour >= 6 && hour < 18;
        }),
      deadline: Yup.date()
        .required('Required')
        .min(new Date(), 'Last date must be in the future')
        .max(Yup.ref('trial_date'), 'Last date must be before the trial date'),
      total_participant_limit: limitChecked ? Yup.number().required('Required') : Yup.number(),
      registration_fee: isFeesChecked ? Yup.number().required('Required') : Yup.number(),
      image: Yup.mixed()
        .test('is-image', 'Only image files are allowed', (value) => {
          if (!value) return true;
          return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
        }),
      additionalRequirements: Yup.array().max(5, 'You can add up to 5 additional requirements'),
    }),
    onSubmit: async (values) => {
        console.log(values);
        setRequirementError('')
        const formData = new FormData();
        for (const key in values) {
          if (key === 'image') {
            console.log('hello');
            if (values[key]){
                formData.append(key, values[key], values[key].name);
            }
          }  else if (Array.isArray(values[key])) {
            // Handle additionalRequirements as an array of objects
            values[key].forEach((item, index) => {
              formData.append(`additionalRequirements[${index}]`, item);
            });
          }else {
            formData.append(key, values[key]);
          }
        }
        formData.forEach((e)=>console.log(e))
        try {
            addTrial.mutate(formData)
            navigate('/academy/list_trials')
          // const response = await userApi.post('trial', formData);
          // console.log(response);
          // if (response.status === 201){
          //   showToastMessage(200,'Trial created successfully')
          // }
        } catch (error) {
          console.error(error);
          // if (error.status ===403){
          //   showToastMessage(error.status,error.data.detail)
          // }else{
          //   showToastMessage(400,"Server error try again later")
          // }
          navigate('/academy/home')
        }
      },
  });

  const addRequirement = () => {
    if (requirements.length <5){
        setRequirements([...requirements, '']);
    } else{
        setRequirementError('You cannot add more than 5 requirements')
    }
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
    formik.setFieldValue('additionalRequirements', newRequirements);
    setRequirementError('')
  };

  const handleStateChange = (e)=>{
    formik.handleChange(e)
    console.log(e.target);
    const state = e.target.value
    const selectedState = all_states.find((obj)=>obj.state===state)
    if (selectedState){
        setDistricts(selectedState.districts)
    }
  }

  return (
    <>
        <Navbar academy={true} />
        <div className='px-10'>
            <Box
                sx={{
                    p: { xs: 2, sm: 4 },
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 3,
                    maxWidth: '1100px',
                    mx: 'auto',
                    my: 8,
                }}
                >
                <Typography variant="h4" gutterBottom textAlign="center">
                Create New Selection Trial
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            />
                        <TextField
                            fullWidth
                            select
                            label="Sport Name"
                            name="sport"
                            value={formik.values.sport}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.sport && Boolean(formik.errors.sport)}
                            helperText={formik.touched.sport && formik.errors.sport}
                            >
                            {
                                all_sports.map((sport,index)=>(
                                    <MenuItem key={index} value={sport}>{sport}</MenuItem>
                                ))
                            }
                        </TextField>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>

                        <TextField
                            fullWidth
                            select
                            label="State"
                            name="state"
                            value={formik.values.state}
                            onChange={handleStateChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}
                            >
                                {
                                    states.map((state,index)=>(
                                        <MenuItem key={index} value={state}>{state}</MenuItem>
                                    ))
                                }
                        </TextField>

                        <TextField
                            fullWidth
                            select
                            label="District"
                            name="district"
                            value={formik.values.district}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.district && Boolean(formik.errors.district)}
                            helperText={formik.touched.district && formik.errors.district}
                        >
                            {
                                districts.map((district,index)=>(
                                    <MenuItem key={index} value={district}>{district}</MenuItem>
                                ))
                            }   
                        </TextField>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Venue"
                            name="venue"
                            value={formik.values.venue}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.venue && Boolean(formik.errors.venue)}
                            helperText={formik.touched.venue && formik.errors.venue}
                        />
                        <TextField
                            fullWidth
                            label="location / landmark"
                            name="location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.venue && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                            />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Trial Date"
                            type="date"
                            name="trial_date"
                            value={formik.values.trial_date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.trial_date && Boolean(formik.errors.trial_date)}
                            helperText={formik.touched.trial_date && formik.errors.trial_date}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth
                            label="Trial Time"
                            type="time"
                            name="trial_time"
                            value={formik.values.trial_time}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.trial_time && Boolean(formik.errors.trial_time)}
                            helperText={formik.touched.trial_time && formik.errors.trial_time}
                            InputLabelProps={{ shrink: true }}
                            />

                        <TextField
                            fullWidth
                            label="Last Date of Joining"
                            type="date"
                            name="deadline"
                            value={formik.values.deadline}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.deadline && Boolean(formik.errors.deadline)}
                            helperText={formik.touched.deadline && formik.errors.deadline}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 ,mx:1}}>
                        <FormControlLabel
                            control={
                            <Checkbox

                            checked={limitChecked}
                            value={formik.values.is_participant_limit}
                            onChange={(e) =>{ setLimitChecked(!limitChecked); formik.handleChange(e)}}
                                name="is_participant_limit"
                                />
                            }
                            label="Total Participant Limit"
                            />

                        {limitChecked && (
                            <TextField
                            
                            label="Total Participants"
                            type="number"
                            name="total_participant_limit"
                            value={formik.values.total_participant_limit}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.total_participant_limit && Boolean(formik.errors.total_participant_limit)}
                            helperText={formik.touched.total_participant_limit && formik.errors.total_participant_limit}
                            />
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4, mx:1 }}>


                    <FormControlLabel
                        control={
                            <Checkbox
                            checked={isFeesChecked}
                            value={formik.values.is_registration_fee}
                            onChange={(e) =>{ setIsFeesChecked(!isFeesChecked); formik.handleChange(e)}}
                            name="is_registration_fee"
                            />
                        }
                        label="Registration Fees"
                        />

                    {isFeesChecked && (
                        <TextField

                        label="Registration Fees"
                        type="number"
                        name="registration_fee"
                        value={formik.values.registration_fee}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.registration_fee && Boolean(formik.errors.registration_fee)}
                        helperText={formik.touched.registration_fee && formik.errors.registration_fee}
                        />
                    )}
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Image"
                            type="file"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ accept: 'image/*' }}
                            name="image"
                            onChange={(event) => formik.setFieldValue('image', event.currentTarget.files[0])}
                            onBlur={formik.handleBlur}
                            error={formik.touched.image && Boolean(formik.errors.image)}
                            helperText={formik.touched.image && formik.errors.image}
                            />
                    </Box>

                        <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        />
                </Box>

                <Typography variant="h6" mt={4}>Additional Requirements</Typography>
                <Box sx={{ mt: 1,display:'flex' }} >
                    {requirements.map((requirement, index) => (
                        <TextField
                        key={index}
                        fullWidth
                        label={`Requirement ${index + 1}`}
                        value={requirement}
                        onChange={(e) => handleRequirementChange(index, e.target.value)}
                        sx={{ mt: 0,ml:1 }}
                    />
                    ))}
                </Box>
                {requirementError && <p className='text-red-600 font-semibold text-sm ml-4 mt-1'>{requirementError}</p>}
                    <Button
                        variant='contained'
                        color='inherit'
                        // style={{backgroundColor:'gray',color:'white'}}
                        onClick={addRequirement}
                        sx={{ mt: 2,ml:1}}
                        
                   >
                    Add Requirement
                    </Button>

                <Box sx={{ mt: 4,textAlign:'center' }}>
                    <Button type="submit" variant="contained" 
                    sx={{px:8}}
                    >
                        Add Trial
                    </Button>
                </Box>
                </form>
            </Box>
        </div>
    </>
  );
};

export default AddTrial;
