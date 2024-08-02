import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import PostModal from './PostModal'
import userApi from '../../../../api/axiosconfig'
import PostVideo from './PostVideo'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { dateDifference } from '../../../common/functions/dateDifference'

const PostProfile = ({data,ownProfile}) => {
  const {userId} = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [posts, setPosts] = useState([])

  const navigate = useNavigate()
  const role = useSelector(state=>state.auth.role)
  const bgColor = role === 'academy' ? "bg-indigo-400":"bg-gblue-400" 
  const textColor = role === 'academy' ? "text-indigo-500": "text-gblue-500" 
  const borderColor = role === 'academy' ? "border-indigo-600" : "border-gblue-700"

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

  const handleOpenModal = () =>{
    setIsModalOpen(true)
  }
  const handleCloseModal = ()=>{
    setIsModalOpen(false)
  }
  return (
    <>
    {
      (posts.length > 0 || ownProfile) &&
      <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 font-kanit">
          <div className='flex justify-between items-center w-full p-8 pb-0'>
              <h4 className="text-xl text-gray-900 font-bold">Posts </h4>
              {
                ownProfile && 
              <div className={`${borderColor} flex border px-2 py-1 rounded-3xl`} onClick={handleOpenModal}>
                  new post 
              </div>
              }
          </div>
          <div className="space-y-6">
            {
              posts.length > 0 ?
              <>
              {posts.slice(0,3).map((post, index) => (
                <div key={index} className="border-b last:border-b-0 px-8 pb-4 cursor-pointer"  onClick={()=>navigate(`/view_post_details/${post.id}`)}>
                  <div className="flex items-center mb-2">
                    {/* <img src={post?.user?.avatar} alt={post.user} className="w-10 h-10 rounded-full mr-3" /> */}
                    <div>
                      {/* <p className="font-semibold">{post.user} posted this</p> */}
                      <p className="text-sm text-gray-500">posted  {dateDifference(post.created_at)}</p>
                    </div>
                  </div>
                  
                  {post.image && (
                    <img src={post?.image} alt="Post content" className="w-16 h-16 object-cover float-left mr-3 mb-2"/>
                  )}
                  
                  {post.video && (
                    <video src={post?.video}  className="w-16 h-16 object-cover float-left mr-3 mb-2" />
                  )}
                  
                  <p className="text-gray-800">{post?.content}</p>
                  
                  
                  <div className="flex items-center mt-4 text-sm text-gray-500">
                    <span className="flex items-center mr-2">
                      {post.likes_count} likes
                    </span>
                    <span>{post.comments?.length} comments</span>
                  </div>
                </div>
              ))}
          </>
            :
            <div className='text-center pb-5'>
                <button className="border border-gblue-400 hover:bg-gblue-500 hover:text-white px-2 py-1 rounded-full mt-4" onClick={handleOpenModal}>
                    add post 
                </button>  
            </div>
          }
      </div>
      
      {
          posts.length > 3 && 
          <Link to={`/view_posts/${userId}`}>
              <div className='flex justify-center border py-2 font-medium cursor-pointer hover:font-semibold hover:bg-gray-100'>
              <div className='flex items-center'>
                      Show All {posts.length} posts  
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mt-1 ml-1 ">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                      </svg>

                  </div>
              </div>
          </Link>
      }   
      </div>
    }
      <PostModal isOpen={isModalOpen} onClose={handleCloseModal} fetchPosts={fetchPosts} />
    </>
  )
}

export default PostProfile
