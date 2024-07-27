import React, { useEffect, useState } from 'react'
import userApi from '../../../../api/axiosconfig'
import { useParams } from 'react-router-dom'
import Navbar from '../../navbar/Navbar'
import { useSelector } from 'react-redux'
import BottomNavbar from '../../navbar/BottomNavbar'
import PostItem from './PostItem'

const ViewAllPosts = () => {
    const {userId} = useParams()
    const role = useSelector(state=>state.auth.role)

    const [posts, setPosts] = useState([])

    useEffect(()=>{
        fetchPosts()
      },[])
    
    const fetchPosts = async ()=>{
    try{
        const res = await userApi.get(`post?id=${userId||''}`)
        console.log(res,' post fetched',userId);
        setPosts(res.data)
    }catch(error){
        console.log(error, 'error fetchign posts');
    }
    }
    
  return (
    <>
    <Navbar academy={role==='academy'} />
        <div className="pb-16 sm:pb-0 ">
            <div className="max-w-2xl mx-auto p-4">
            {posts.map(post => (
                <PostItem post={post} key={post.id} />
            ))}
            </div>
        </div>
    <BottomNavbar academy={role==='academy'} />
    </>
  )
}

export default ViewAllPosts
