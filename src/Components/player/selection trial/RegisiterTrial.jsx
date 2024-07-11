import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container, Box, TextField, Typography, Button, Grid, Paper,
  MenuItem
} from '@mui/material';
import userApi from '../../../api/axiosconfig';
import Navbar from '../../layouts/navbar/Navbar';
import { showToastMessage } from '../../common/functions/showToastMessage';

const RegisterTrial = () => {
  const { id } = useParams();
  const [trial,setTrial] = useState({})
  const navigate = useNavigate();

  const [player, setPlayer] = useState({});

  useEffect(() => {
      fetchTrialData()
      fetchPlayerData();
      formik.setValues({
        name:player?.user?.username,
        dob:player?.user?.dob,
        email:player?.user?.email,
        state:player?.profile?.state,
        district:player?.profile?.district,
        achievement:'',
        additional_requirements: trial?.additional_requirements?.map(req => ({
            requirement: req.requirement,
            value: ''
      })) || []
    })
    }, []);

    const fetchTrialData = async ()=>{
        try{
            const response = await userApi.get(`trial/${id}`)
            setTrial(response.data)

        }catch(error){
            console.log(error,'error fetching trial');
        }
    }
    const fetchPlayerData = async () => {
      try{
        const response = await userApi(`profile`)
        console.log(response);
        setPlayer(response.data.user_details);
      }catch(error){
        console.log(error,'player fetchig eror');
      }
    };

  const formik = useFormik({
    initialValues: {
        name:player?.user?.username || '',
        dob:player?.user?.dob ||'',
        number:player?.user?.number || '',
        email:player?.user?.email || '',
        state:player?.profile?.state || '',
        district:player?.profile?.district || '', 
        achievement:'',
        additional_requirements : trial?.additional_requirements?.map(req => ({
            requirement: req.requirement,
            value: ''
      })) || [],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      dob: Yup.date().required('Date of Birth is required'),
      number: Yup.string().required('Number is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      state: Yup.string().required('State is required'),
      district: Yup.string().required('District is required'),
      achievement: Yup.string().required('Achievement is required'),
      additional_requirements: Yup.array().of(
        Yup.object().shape({
          requirement: Yup.string(),
          value: Yup.string().required('This field is required')
        })
      )
    }),
    onSubmit: async (values) => {
        console.log(values);
      const registrationData = {
        ...values,
        trial: id,
        player:player?.user?.id,
        additional_requirements: values.additional_requirements.map((req, index) => ({
          requirement: trial.additional_requirements[index].requirement,
          value: req.value
        }))

      };
      console.log(registrationData);
      try{
        const response = await userApi.post('player_trial',registrationData)
        console.log(response);
        showToastMessage(200,"registered succesfully")
        navigate(`/trial_details/${id}`)
      }catch(error){
        showToastMessage(400,"some error in registration try again later")
        console.log(error,'create register trial');
      }
    //   registerPlayerMutation.mutate(registrationData, {
    //     onSuccess: () => {
    //       navigate(`/trials/${id}`);
    //     },
    //   });
    }
  });
  console.log(trial,player,formik.values);


  return (
    <>
    <Navbar />
    <Container>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <svg onClick={()=>navigate(-1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:text-gblue-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        <Typography variant="h4" gutterBottom mb={3} sx={{display:'flex',justifyContent:'center',textTransform:'capitalize'}}>
          Register for  {trial.name}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date of Birth"
                name="dob"
                type="date"
                fullWidth
                value={formik.values.dob}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputLabelProps={{ shrink: true }}
                error={formik.touched.dob && Boolean(formik.errors.dob)}
                helperText={formik.touched.dob && formik.errors.dob}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Number"
                name="number"
                fullWidth
                value={formik.values.number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.number && Boolean(formik.errors.number)}
                helperText={formik.touched.number && formik.errors.number}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                name="state"
                fullWidth
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="District"
                name="district"
                fullWidth
                value={formik.values.district}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.district && Boolean(formik.errors.district)}
                helperText={formik.touched.district && formik.errors.district}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Achievement"
                name="achievement"
                select
                fullWidth
                value={formik.values.achievement}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.achievement && Boolean(formik.errors.achievement)}
                helperText={formik.touched.achievement && formik.errors.achievement}
                >
                  <MenuItem value='None'>None</MenuItem>
                  <MenuItem value='native'>Played in native tournaments</MenuItem>
                  <MenuItem value='district'>Played in District level tournaments</MenuItem>
                  <MenuItem value='state'>Played in State level tournaments</MenuItem>
                  <MenuItem value='nation'>Played in National level tournaments</MenuItem>
                </TextField>
            </Grid>
            {
                formik?.values?.additional_requirements?.length > 0 && 
                    <Grid item xs={12} >
                        {formik?.values?.additional_requirements?.map((req, index) => (
                        <TextField key={index}
                            label={trial.additional_requirements[index].requirement}
                            name={`additional_requirements[${index}].value`}
                            value={req.value || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{marginRight:1,marginBottom:1}}                            
                            error={
                                formik.touched.additional_requirements?.[index]?.value &&
                            Boolean(formik.errors.additional_requirements?.[index]?.value)
                            }
                            helperText={
                                formik.touched.additional_requirements?.[index]?.value &&
                                formik.errors.additional_requirements?.[index]?.value
                            }
                        />
                        ))}
                    </Grid>
                }   
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    </>
  );
};

export default RegisterTrial;
