import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Navbar from '../../layouts/navbar/Navbar'
import BottomNavbar from '../../layouts/navbar/BottomNavbar'
import userApi from '../../../api/axiosconfig'
import RightSide from './RightSide';
import LeftSide from './LeftSide';
import Center from './Center';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skelton_Post from '../../../Pages/Skeltons/Skelton_Post';
import SkeltonLeftSide from '../../../Pages/Skeltons/SkeltonLeftSide';
import SkeltonRightSide from '../../../Pages/Skeltons/SkeltonRightSide';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [userDetials,setUserDetails] = useState(null)
  const [trialDetails,setTrialDetails] = useState([])
  const [academyDetails, setAcademyDetails] = useState([])

  useEffect(() => {
      fetchPosts();
    }, []);

  const fetchPosts = async () => {
  try {
      setLoading(true)
      const response = await userApi.get(`home`,{
        params:{
          page:page
        }
      }); // Adjust the endpoint as needed
      console.log(response);
      const newPost = response.data.posts
      setPosts(newPost)
      setHasMore(response.data.has_more)
      setPage(response.data.page)
      setUserDetails(response.data.user)
      setTrialDetails(response.data.trials)
      setAcademyDetails(response.data.academies)

  } catch (error) {
      console.error('Error fetching posts:', error);
  }finally{
    setLoading(false) 
  }
  };
console.log(page, hasMore,posts,);
  return (
     < >
    <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <InfiniteScroll 
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMore}
          loader={<Skelton_Post/>}
        >
      <Box sx={{ p: 3, overflow: 'hidden'  }}>
        <Grid container spacing={3} sx={{ height: '100%' }}>
          {!isMobile && (
            <Grid item md={3}>
              {loading && page === 1? <SkeltonLeftSide/> : <LeftSide userDetails={userDetials} />}
            </Grid>
          )}
          <Grid item xs={12} md={isMobile ? 12 : 6} sx={{ height: '100%', overflow: 'hidden' }}>
            {loading && page === 1? <Skelton_Post/> : <Center posts={posts} fetchPosts={fetchPosts} /> }  
          </Grid>
          {!isMobile && (
            <Grid item md={3}>
              {loading && page === 1? <SkeltonRightSide/> : <RightSide trialDetails={trialDetails} academyDetails={academyDetails} />}
            </Grid>
          )}
        </Grid>
      </Box>
      </InfiniteScroll>
    <BottomNavbar/>
    </Box>
    </>
  )
}

export default Home
