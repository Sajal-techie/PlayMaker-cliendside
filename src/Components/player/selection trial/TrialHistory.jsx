import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid, Button, IconButton } from '@mui/material';
import Navbar from '../../layouts/navbar/Navbar';
import userApi from '../../../api/axiosconfig';
import { convertTo12HourFormat } from '../../common/functions/covertTime';
import { Link, useNavigate } from 'react-router-dom';
import BottomNavbar from '../../layouts/navbar/BottomNavbar';

const TrialHistoryPage = () => {
    const [trial, setTrial] = useState([]);
    
    const navigate = useNavigate()

    const fetchTrial = async () => {
        try {
            const response = await userApi.get('trial_history');
            console.log(response);
            setTrial(response.data);
        } catch (error) {
            console.log(error, 'trial history fetching error');
        }
    };
    
    useEffect(() => {
        fetchTrial();
    }, []);
    
    return (
        <>
            <Navbar />
            <Box padding={2} maxWidth="1200px" margin="0 auto" paddingBottom={10}>
                <Box display="flex" alignItems="center" mb={2}>
                    <IconButton onClick={() => navigate(-1)} aria-label="back">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </IconButton>
                    <Typography variant="h5" color="textPrimary" ml={1}>
                        Trial History
                    </Typography>
                </Box>
                {
                    trial.length > 0 ?
                    <Grid container spacing={3}>
                        {trial.map((trial) => (
                            <Grid item xs={12} key={trial.trial_id}>
                                <Card>
                                    <Grid container>
                                        <Grid item xs={12} md={4}>
                                            <CardMedia
                                                component="img"
                                                alt={trial.trial_name}
                                                sx={{ width: '100%', height: 250, objectFit: 'cover' }}
                                                image={trial.trial_image || 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={8}>
                                            <CardContent>
                                                <Typography variant="h5" color="primary" gutterBottom>{trial.trial_name}</Typography>
                                                <Typography variant="body2" color="textSecondary" textTransform="capitalize">{trial.trial_sport}</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {new Date(trial.trial_date).toDateString()} at {convertTo12HourFormat(trial.trial_time)}
                                                </Typography>
                                                <Typography variant="body2">{trial.trial_venue}, {trial.trial_location}, {trial.trial_district}, {trial.trial_state}</Typography>
                                                <Typography variant="body1" color="textSecondary" textTransform="capitalize">Status: <span className={trial.status === 'selected' ? 'text-green-500' : trial.status === 'rejected' ? 'text-red-500' : 'text-amber-700'}>{trial.status}</span></Typography>
                                                <Typography variant="h6" color="textSecondary">ID: <span>{trial.unique_id}</span></Typography>
                                                <Box display="flex" justifyContent="flex-end">
                                                    <Link to={`/trial_details/${trial.trial_id}`}>
                                                        <Button variant="contained" color="primary">View Details</Button>
                                                    </Link>
                                                </Box>
                                            </CardContent>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    :
                    (
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50vh">
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                You haven't participated in any trials yet.
                            </Typography>
                            <Link to="/list_trials" style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                                    Explore Trials
                                </Button>
                            </Link>
                        </Box>
                    )
                }
            </Box>
        <BottomNavbar />
        </>
    );
};

export default TrialHistoryPage;
