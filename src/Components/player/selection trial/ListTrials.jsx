import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Select, MenuItem, InputLabel, FormControl, useTheme } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ThreeDots } from 'react-loader-spinner'
import Navbar from '../../layouts/navbar/Navbar';
import TrialCard from '../../academy/selection trials/ListOwnTrials/TrialCard';
import userApi from '../../../api/axiosconfig';
import all_sports from '../../../api/json data/sports';
import all_states from '../../../api/json data/states_districts';
import BottomNavbar from '../../layouts/navbar/BottomNavbar';


const ListTrials = () => {
  const [trialList, setTrialList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sport, setSport] = useState('');
  const [state, setState] = useState('');
  const [payment, setPayment] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchTrialsList(1);
  }, [searchTerm,sport,state,payment]);

  const fetchTrialsList = async (pageNum=1) => {
    try {
      const response = await userApi('trial', {
        params: {
          page: pageNum,
          search: searchTerm,
          sport: sport,
          state: state,
          payment: payment,
        }
      });
      console.log(response); 
      const newTrialList = response.data.results
      setTrialList(prevTrials => pageNum === 1 ? newTrialList : [...prevTrials, ...newTrialList]);
      setHasMore(response.data.next != null)
      setPage(pageNum)
    } catch (error) {
      console.log(error, 'error fetching trial list');
    }
  };

  const loadMoreTrials = ()=>{
    if (hasMore){
      fetchTrialsList(page + 1)
    }
  }


  const states = all_states.map((obj) => obj.state);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1)
  };

  const handleSportChange = (event) => {
    setSport(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handlePaymentChange = (event) => {
    setPayment(event.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const filteredTrials = trialList.filter(trial =>
    trial.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (sport === '' || trial.sport === sport) &&
    (state === '' || trial.state === state) &&
    (payment === '' || trial.is_registration_fee === payment)
  );

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 3, pb:10 }} >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search trials"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ backgroundColor: 'white', borderRadius: 4 }}
          />
          <Button variant="outlined" onClick={toggleFilters} sx={{ ml: 2 }}>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </Box>
        {showFilters && (
          <Box mb={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Sport</InputLabel>
                  <Select
                    value={sport}
                    onChange={handleSportChange}
                    label="Sport"
                  >
                    <MenuItem value=""><em>All</em></MenuItem>
                    {all_sports.map((sportValue, index) => (
                      <MenuItem key={index} value={sportValue}>{sportValue}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>State</InputLabel>
                  <Select
                    value={state}
                    onChange={handleStateChange} 
                    label="State"
                  >
                    <MenuItem value=""><em>All</em></MenuItem>
                    {states.map((stateValue, index) => (
                      <MenuItem key={index} value={stateValue}>{stateValue}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Payment</InputLabel>
                  <Select
                    value={payment}
                    onChange={handlePaymentChange}
                    label="Type"
                  >
                    <MenuItem value=""><em>All</em></MenuItem>
                    <MenuItem value={true}>Paid</MenuItem>
                    <MenuItem value={false}>Free</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        )}
        <InfiniteScroll 
            dataLength={trialList.length}
            next={loadMoreTrials}
            hasMore={hasMore}
            loader={<div className='flex justify-center'>
                  <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="rgb(30 136 229)"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  />
              </div> }
          >

          <Grid container spacing={4}>
            {filteredTrials.length > 0 ? (
              filteredTrials.map((trial, index) => (
                <Grid item xs={12} key={index}>
                  <TrialCard {...trial} />
                </Grid>
              ))
            ) : (
              <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
                No trials found
              </Typography>
            )}
          </Grid>
        </InfiniteScroll>
      </Container>
      <BottomNavbar />
    </>
  );
};

export default ListTrials;
