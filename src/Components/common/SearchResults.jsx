import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import userApi from '../../api/axiosconfig';
import Navbar from '../layouts/navbar/Navbar';
import { useSelector } from 'react-redux';
import BottomNavbar from '../layouts/navbar/BottomNavbar';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filter, setFilter] = useState('All');
  const location = useLocation();
  const navigate = useNavigate()
  const role = useSelector(state=>state.auth.role)
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    
    fetchResults(query);
  }, [query]);
  
  const fetchResults = async (query) => {
    console.log(query);
    if (query) {
      try {
        const response = await userApi.get(`search?q=${query}`);
        console.log(response);
        setResults(response.data);
        setFilteredResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  useEffect(() => {
    if (filter === 'All') {
      setFilteredResults(results);
    } else {
      setFilteredResults(results.filter(result => result.type === filter));
    }
  }, [filter, results]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleResultClick = async (data) =>{
    console.log(data);
    if (data.type ==='Trial'){
      navigate(`/trial_details/${data.id}`)
    }else if(data.type==='Player' || data.type==='Academy'){
      navigate(`/profile/${data.id}`);
    }
  }
  const handleAddFriend = async (to_user)=>{
    try{
      const res = await userApi.post(`friend_request`,{'to_user':to_user})
      console.log(res);
      updateResultStatus(to_user,'friend_status','request_sent')
    }catch(error){
      console.log(error);
    }
  }
  const handleCancelRequest = async (id)=>{
    try{
      const res = await userApi.post(`cancel_request/${id}`)
      console.log(res);
      updateResultStatus(id,'friend_status','none')
    }catch(error){
      console.log(error,'error  cancelling request');
    }
  }
  const handleAccept = async (id)=>{
    try{
      const res = await userApi.post(`friend_request_accept/${id}`)
      console.log(res);
      updateResultStatus(id,'friend_status','friends',1)
    }catch(error){
      console.log(error);
    }
  }
  const handleFollow = async (academy_id) =>{
    try{
      const res = await userApi.post(`follow`,{'academy':academy_id})
      console.log(res);
      updateResultStatus(academy_id,'follow_status','following',1)
    }catch(error){
      console.log(error,'error following academy');
    }
  } 
  const handleUnfollow = async (id)=>{
    try{
      const res = await userApi.post('unfollow',{'academy':id})
      console.log(res,'unfollowed successfully');
      updateResultStatus(id,'follow_status','none',-1)
    }catch(error){
      console.log(error, 'unfollow error');
    }
  }
  const updateResultStatus = (id, statusType, statusValue,count=0) => {
    setResults(prevResults =>
      prevResults.map(result =>
        result.id === id ? { ...result, [statusType]: statusValue, count:result.count+count } : result
      )
    );
    setFilteredResults(prevFilteredResults =>
      prevFilteredResults.map(result =>
        result.id === id ? { ...result, [statusType]: statusValue, count:result.count+count } : result
      )
    );
  };

  const renderButtons = (data) => {
    console.log(data);
    if (data.type === 'Player' || data.type === 'Academy') {
      if (data.type === 'Player') {
        if (data.friend_status === 'friends') {
          return <button className='bg-blue-400 text-white px-3 py-1'>Message</button>;
        } else if (data.friend_status === 'request_received') {
          return <button className='bg-blue-400 text-white px-3 py-1' onClick={()=>handleAccept(data.id)}>Accept</button>;
        } else if (data.friend_status === 'request_sent') {
          return <button className='bg-gray-400 text-white px-3 py-1' onClick={()=>handleCancelRequest(data.id)}>Cancel Request</button>;
        } else if(data.friend_status ==='self'){
          return <button className='bg-blue-400 text-white px-3 py-1' onClick={()=>navigate('/profile')}>View Profile</button>;
        } 
        else {
          return <button className='bg-blue-400 text-white px-3 py-1' onClick={()=>handleAddFriend(data.id)}>Add Friend</button>;
        }
      }
      if (data.type === 'Academy') {
        if (data.follow_status === 'following') {
          return <button className='bg-gray-400 text-white px-3 py-1' onClick={()=>handleUnfollow(data.id)}>Following</button>;
        } else {
          return <button className='bg-blue-400 text-white px-3 py-1' onClick={()=>handleFollow(data.id)}>Follow</button>;
        }
      }
    }
  };
  console.log(filteredResults,'\nsss',results);
  return (
    <>
    <Navbar academy={role==='academy'} />
    <div className="p-4 px-20 pb-20 font-kanit">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Search Results</h1>
        <select value={filter} onChange={handleFilterChange} className="border p-2 rounded">
          <option value="All">All</option>
          <option value="Player">Players</option>
          <option value="Academy">Academies</option>
          <option value="Trial">Trials</option>
        </select>
      </div>
      <ul>
        {filteredResults.map((result,index) => (
          <li key={index} className="p-2 border-b-4 bg-white">
            <div className='flex justify-between'>
              <div className="flex items-center space-x-3 cursor-pointer" onClick={()=>handleResultClick(result)}>
                <img
                  src={result.photoUrl || "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"}
                  alt={result.name}
                  className="block w-9 h-9 rounded-full bg-gray-300"
                  />
                <div>
                  <p className="text-lg font-semibold">{result.name}  <span className='text-base'>({result.type}) </span> </p>
                  {result.bio && <p className="text-sm text-gray-500">{result.bio}</p>}
                  {result.type === 'Academy' && <p>Followers: {result.count}</p>}
                  {result.type === 'Player' && <p>Friends: {result.count}</p>}
                  {result.type === 'Trial' && <p>Registered Players: {result.count}</p>}
                </div>
              </div>
                <div className='flex items-center'>
                  {renderButtons(result)}
                </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    <BottomNavbar academy={role==='academy'} />
    </>
  );
};

export default SearchResults;
