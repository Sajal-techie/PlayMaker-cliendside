import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostModal from '../../layouts/profile layouts/Post Section/PostModal';

const PopularPosts = ({ posts, fetchDashboardData }) => {
    const userId = useSelector(state=>state.auth.user_id)
    const [isOpen, setIsOpen] = useState(false)

    const handleModalOpen = ()=>{
        setIsOpen(true)
    }
    const handleModalClose = ()=>{
        setIsOpen(false)
    }
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Popular Posts</h3>
        <Link to={`/view_posts/${userId}`} className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2">
          View all
        </Link>
      </div>
      {
        posts.length > 0 ? 
        <ul className="divide-y divide-gray-200">
        {posts.map((post, index) => (
            <li key={index} className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <Link to={`/view_post_details/${post.id}`} > 
                    <p className="text-sm font-medium text-gray-900 truncate  hover:underline hover:text-indigo-400">{post.content}</p>
                </Link>
                {/* <p className="text-sm text-gray-500 truncate">{post.excerpt}</p> */}
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                {post.likes_count} likes
              </div>
            </div>
          </li>
        ))}
      </ul>
      :
        <div className='text-center text-white px-4 py-3 '>
            <button  onClick={handleModalOpen} className='px-4 py-2 bg-indigo-500 font-bold'>
                New Post
            </button>
        </div>
    }

    <PostModal isOpen={isOpen} onClose={handleModalClose} fetchPosts={fetchDashboardData} />
    </div>
  );
};

export default PopularPosts;