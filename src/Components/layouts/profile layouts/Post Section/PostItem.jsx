import React, { useEffect, useRef, useState } from 'react';
import PostVideo from './PostVideo';
import { TfiCommentAlt } from "react-icons/tfi";
import { RiShareForwardLine } from "react-icons/ri";
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { dateDifference } from '../../../common/functions/dateDifference';
import userApi from '../../../../api/axiosconfig';
import { showToastMessage } from '../../../common/functions/showToastMessage';
import CommentList from './CommentList';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PostModal from './PostModal';

const PostItem = ({ post, fetchPost }) => {
    const [liked, setLiked] = useState(post.is_liked_by_current_user);
    const [likesCount, setLikesCount] = useState(post.likes_count);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(post.comments);
    const [optionsVisible, setOptionsVisible] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    
    const postLink = import.meta.env.VITE_SITE_URL + '/view_post_details/' + post.id
    const profileLink = post.is_academy ? `/academy/profile/${post.user_id}` : `/profile/${post.user_id}`
    const role = useSelector(state=>state.auth.role)
    const navigate = useNavigate()
    const optionsRef = useRef(null)

    const handleOptionsClick = ()=>{
        setOptionsVisible(!optionsVisible)
    }

    const handleCopyLink = async ()=>{
        console.log(postLink);
        try{
            await navigator.clipboard.writeText(postLink)
            showToastMessage(200, 'post link copied to clipboard')
        }catch(error){
            console.log(error);
        }
        setOptionsVisible(false)
    }
    const openEditModal =()=>{
        setOptionsVisible(false)
        setIsEditModalOpen(true)
    }
    const closeEditModal = ()=>{
        setIsEditModalOpen(false)
    }


    useEffect(()=>{
        const handleClickOutside = (event)=>{
            if (optionsRef.current && !optionsRef.current.contains(event.target)){
                setOptionsVisible(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside)
        }   
    },[optionsRef])

    const handleLike = async () => {
        setLiked(!liked);
        try {
            const response = await userApi.post(`like/${post.id}`);
            console.log(response);
            if (response.data.status === 'liked') {
                setLikesCount(likesCount + 1);
            } else {
                setLikesCount(likesCount - 1);
            }
        } catch (error) {
            setLiked(!liked)
            console.log(error, 'error liking');
        }
    };

    const handleCommentChange = (e)=>{
        setNewComment(e.target.value)
    }

    const handleCommentSubmit = async (e, content, parentId = null) => {
        e.preventDefault();
        if (content.trim() ===''){
            showToastMessage(400, 'Comment cannot be empty')
            return
        }
        try {
            const response = await userApi.post(`add_comment/${post.id}`, { 
                content: content,
                parent: parentId
            });
            console.log(response,parentId);
            if (parentId) {
                // if nested commented then check comment id is same as parentid then spread replies and add the new comment
                setComments(prevComments => {
                    const updateReplies = (comments) => {
                        return comments.map(comment => 
                            comment.id === parentId    
                                ? { ...comment, replies: [...(comment.replies || []), response.data] }
                                : { ...comment, replies: updateReplies(comment.replies || []) }
                        );
                    };
                    return updateReplies(prevComments);
                });
            } else {
                setComments([...comments, response.data]);
            }
            setNewComment('');
        } catch (error) {
            console.log(error, 'error commenting');
            if (error.status === 404){
                showToastMessage(400, 'Post has been Deleted or removed')
            }else{
                showToastMessage(400, "Server error try again later")
            }
        }
    };

    const handleDelete = async ()=>{
        try{
            const res = await userApi.delete(`post/${post.id}`)
            console.log(res);
            showToastMessage(200, 'post deleted successfully')
            navigate(-1)
        }catch(error){
            console.log(error, 'error deleting post');
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md mb-4 p-4" key={post.id}>
            <div className='flex justify-between relative'>
                <div className="flex items-center mb-2">
                    <img src={post.profile_photo || 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg'} alt={post.username} className='w-12 h-12 rounded-full mr-3' />
                    <div>
                        <Link to={profileLink} className="font-semibold text-gray-800 hover:underline hover:text-gblue-500">{post.user}</Link>
                        <p className="text-sm text-gray-600">{post.bio}</p>
                        <span className="text-xs text-gray-500">{dateDifference(post.created_at)}</span>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" onClick={handleOptionsClick}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
                {
                    optionsVisible && 
                    <div ref={optionsRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-xl z-10">
                    {/* <button
                      className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full"
                      onClick={handleBlock}
                    >
                      Block
                    </button> */}
                    {/* {
                        role === 'player' ?

                    } */}
                            <button
                            className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full border-b"
                            onClick={handleCopyLink}
                            >
                            copy link
                            </button>
                            {
                                post.is_own_post &&
                                <>
                                <button
                                className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full border-b"
                                onClick={openEditModal}
                                >
                                Edit post
                                </button>
                                <button
                                className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full"
                                onClick={handleDelete}
                                >
                                delete post
                                </button>
                                </>
                            }
                  </div>
                }
            </div>
            <div className="post-content">
                <p className="text-gray-800 mb-3">{post.content}</p>
                {post.image && <img src={post.image} alt={post.user} className='w-full mb-3' />}
                {post.video && <PostVideo src={post.video} />}
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
                <div className="flex items-center text-sm text-gray-500 m-2">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                    </svg> */} &nbsp;
                    <span className="ml-1">{likesCount} likes</span> &nbsp;
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 ml-3 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg> */}
                    <span>{post.comments.length} comments</span>
                </div>
                <div className="space-x-2">
                    <button className="hover:bg-gray-100 p-2 rounded-full mt-2" onClick={handleLike}>
                        {
                            liked ? 
                            <AiFillLike size={25} color='rgb(30 136 229)' />
                            :
                            <AiOutlineLike size={25} />
                        }
                    </button>
                    <button className="hover:bg-gray-100 p-2 rounded-full mt-2" onClick={() => setShowComments(!showComments)}>
                        <TfiCommentAlt size={22} />
                    </button>
                    {/* <button className="hover:bg-gray-100 p-2 rounded-full mt-2">
                        <RiShareForwardLine size={22} />
                    </button> */}
                </div>
            </div>
            {showComments && (
                <div className="mt-4">
                    <form onSubmit={(e)=>handleCommentSubmit(e,newComment)} className="mb-4">
                        <input
                            type="text"
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder="Add a comment..."
                            className="border border-gray-300 rounded-full px-4 py-2 w-full"
                        />
                    <button type="submit" className="mt-2 bg-blue-500 text-white px-2 py-1 rounded font-bold" >
                        Comment
                    </button>
                    </form>
                        <CommentList 
                            comments={comments}
                            postId={post.id}
                            handleReplySubmit={handleCommentSubmit}
                        />

                </div>
            )}
            <PostModal isOpen={isEditModalOpen} onClose={closeEditModal} post={post} fetchPosts={fetchPost} />
        </div>
    );
};

export default PostItem;
