import React, { useEffect, useState } from 'react'
import userApi from '../../../../api/axiosconfig'
import { useNavigate, useParams } from 'react-router-dom'
import PostItem from './PostItem'
import { useSelector } from 'react-redux'
import Navbar from '../../navbar/Navbar'
import BottomNavbar from '../../navbar/BottomNavbar'

const ViewPost = () => {
    const [post, setPost] = useState('')
    const {postId} = useParams()
    const role = useSelector(state=>state.auth.role)
    const navigate = useNavigate()

    useEffect(()=>{
        fetchPost()
    },[postId])
    console.log(postId,'post id');

    const fetchPost = async ()=>{
        try{
            const res = await userApi.get(`post/${postId}`)
            console.log(res,'post fetched');
            setPost(res.data)
        }catch(error){
            console.log(error, 'error fetching post');
            navigate(-1)
        }
    }
    console.log(post);
  return (
    <>
    <Navbar academy={role==='academy'} />
    {
        post &&
        <div className="pb-16 sm:pb-0 ">
            <div className="max-w-2xl mx-auto p-4">
                <PostItem post={post} fetchPost={fetchPost} />
            </div>
        </div>
    }
    <BottomNavbar  academy={role==='academy'} />
    </>
  )
}

export default ViewPost
