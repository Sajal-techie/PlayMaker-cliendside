import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import RedirectIfAuthenticated from './protected/RedirectIfAuthenticated';
import ProtectedRoute from './protected/ProtectedRoute';
import Skelton_profile from '../Pages/Skelton_profile';
import FriendRequest from '../Components/player/friends/friend request/FriendRequest';
import FriendList from '../Components/player/friends/friends list/FriendList';
import SentRequest from '../Components/player/friends/sent requests/SentRequest';
import Following from '../Components/player/friends/following/Following';
import SearchResults from '../Components/common/SearchResults';
import ViewPost from '../Components/layouts/profile layouts/Post Section/ViewPost';
import Chat from '../Components/common/Chat/Chat';
import Notifications from '../Components/common/Notification/Notifications';
import Home from '../Components/player/Home/Home';


// const Home = lazy(()=> import ('../Components/player/Home/Home') )
const Login = lazy(()=> import ('../Components/player/Login'))
const Signup = lazy(()=> import('../Components/player/Signup/Signup'))
const OTP_verification = lazy(()=> import ('../Components/common/OTP_verification')) 
const ErrorPage404 = lazy(()=> import('../Components/common/ErrorPage404'))
const PlayerProfile = lazy(()=> import('../Components/player/PlayerProfile'))
const ViewExperience = lazy(()=> import('../Components/layouts/profile layouts/Experience Section/ViewExperience'))
const ViewAchievement = lazy(()=> import('../Components/layouts/profile layouts/Achievement Section/ViewAchievement'))
const ForgetPassword= lazy(()=> import('../Components/common/ForgetPassword'))
const ResetPassword = lazy(()=> import('../Components/common/ResetPassword'))
const GetUserDetails = lazy(()=> import('../Components/player/Signup/GetUserDetails'))
const ListTrials = lazy(()=>import('../Components/player/selection trial/ListTrials'))
const ViewTrialdetails = lazy(()=>import('../Components/player/selection trial/ViewTrialdetails'))
const RegisterTrial = lazy(()=>import('../Components/player/selection trial/RegisiterTrial'))
const PaymentSuccess = lazy(()=>import('../Components/player/selection trial/PaymentSuccess'))
const PaymentFailed = lazy(()=>import('../Components/player/selection trial/PaymentFailed'))
const TrialHistory = lazy(()=>import('../Components/player/selection trial/TrialHistory'))
const ViewAllPosts = lazy(()=>import('../Components/layouts/profile layouts/Post Section/ViewAllPosts'))

const PlayerRoutes = () => {
    
  return (  
      <Suspense fallback={<Skelton_profile/>}>
        <Routes>
              <Route path="/" element={<RedirectIfAuthenticated element={<Login/>} redirectTo={'/home'} />   }/>
              <Route path="/signup" element={<RedirectIfAuthenticated element={<Signup/>} redirectTo={'/home'} />  }/>
              <Route path='/otp_verification' element={<RedirectIfAuthenticated element={<OTP_verification/>} redirectTo={'/home'} />  } />
              <Route path='/forget_password' element={<RedirectIfAuthenticated element={<ForgetPassword/>} redirectTo={'/home'} />  } />
              <Route path='/reset_password' element={<RedirectIfAuthenticated element={<ResetPassword/>} redirectTo={'/home'} />  } />
              
              <Route path='/home' element={<ProtectedRoute element={<Home/>} role={"player"} />}/>
              <Route path='/welcome' element={<ProtectedRoute element={<GetUserDetails/>} role={"player"} />}/>
              <Route path='/profile/:userId?' element={<ProtectedRoute element={<PlayerProfile/>} role={"both"} /> }/>
              <Route path='/view_experience' element={<ProtectedRoute element={<ViewExperience/>} role={"player"} /> }/>
              <Route path='/view_achievements' element={<ProtectedRoute element={<ViewAchievement/>} role={"both"} /> }/>
              <Route path='/list_trials' element={<ProtectedRoute element={<ListTrials/>} role={"player"} /> }/>
              <Route path='/trial_details/:id' element={<ProtectedRoute element={<ViewTrialdetails/>} role={"player"} /> }/>
              <Route path='/register_trial/:id' element={<ProtectedRoute element={<RegisterTrial/>} role={"player"} /> }/>
              <Route path='/payment_success' element={<ProtectedRoute element={<PaymentSuccess/>} role={"player"} /> }/>
              <Route path='/payment_failed' element={<ProtectedRoute element={<PaymentFailed/>} role={"player"} /> }/>
              <Route path='/trial_history' element={<ProtectedRoute element={<TrialHistory/>} role={"player"} /> }/>
              <Route path='/friends' element={<ProtectedRoute element={<FriendList/>} role={"player"} /> }/>
              <Route path='/following' element={<ProtectedRoute element={<Following/>} role={"player"} /> }/>
              <Route path='/friend_request_list' element={<ProtectedRoute element={<FriendRequest/>} role={"player"} /> }/>
              <Route path='/sent_request_list' element={<ProtectedRoute element={<SentRequest/>} role={"player"} /> }/>
              <Route path='/search' element={<ProtectedRoute element={<SearchResults/>} role={"both"} /> }/>
              <Route path='/view_posts/:userId?' element={<ProtectedRoute element={<ViewAllPosts/>} role={"both"} /> }/>
              <Route path='/view_post_details/:postId' element={<ProtectedRoute element={<ViewPost/>} role={"both"} /> }/>
              <Route path='/chat/:threadName?' element={<ProtectedRoute element={<Chat/>} role={"both"} /> }/>
              <Route path='/notification' element={<ProtectedRoute element={<Notifications/>} role={"both"} /> }/>
              <Route path='*' element={<ErrorPage404/>}/>
        </Routes>
      </Suspense>
  )
}

export default PlayerRoutes
