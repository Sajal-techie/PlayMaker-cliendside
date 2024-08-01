import React, { useState } from 'react';
import { showToastMessage } from '../../../common/functions/showToastMessage';
import CommentList from './CommentList';
import { baseUrl } from '../../../../api/api';
import { Link } from 'react-router-dom';

const CommentItem = ({ comment, postId, handleReplySubmit, depth }) => {
    const [reply, setReply] = useState('');
    const [showReplyForm, setShowReplyForm] = useState(false);
    const maxDepth = 10
    const profileLink = comment.is_academy ? `/academy/profile/${comment.user_id}` : `/profile/${comment.user_id}`

    const handleReplyChange = (e) => {
        setReply(e.target.value);
    };

    const handleReply = async (e) => {
        e.preventDefault();
        if (reply.trim() === '') {
            showToastMessage(400, 'Reply cannot be empty')
            return
        }
        await handleReplySubmit(e, reply, comment.id);
        setReply('');
        setShowReplyForm(false);
    };

    return (
        <div className="flex flex-col mt-2">
            <div className="flex items-start">
                <img src={comment.profile_photo ? baseUrl+comment.profile_photo :"https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"} alt={comment.user} className="w-8 h-8 rounded-full mr-2 flex-shrink-0" />
                <div className="flex-grow min-w-0">
                    <div className="bg-gray-100 p-2 rounded-lg break-words">
                        <Link to={profileLink} className="font-semibold hover:underline hover:text-gblue-500">{comment.user}</Link>
                        <p className="text-sm">{comment.content}</p>
                    </div>
                    {
                        depth <= maxDepth && (

                            <button
                                className="text-xs text-blue-500 mt-1"
                                onClick={() => setShowReplyForm(!showReplyForm)}
                            >
                                Reply
                            </button>
                        )
                    }
                    {showReplyForm && (
                        <form onSubmit={handleReply} className="mt-2">
                            <input
                                type="text"
                                value={reply}
                                onChange={handleReplyChange}
                                placeholder="Write a reply..."
                                className="border border-gray-300 rounded-full px-4 py-2 w-full"
                            />
                            <button type="submit" className="mt-2 bg-blue-500 text-white px-2 py-1 rounded font-bold" >
                                Reply 
                            </button>
                        </form>
                    )}
                </div>
            </div>
            {comment.replies && comment.replies.length > 0 && depth <= maxDepth &&(
                <div className="pl-8 mt-2">
                    <CommentList
                        comments={comment.replies}
                        postId={postId}
                        handleReplySubmit={handleReplySubmit}
                        depth={depth + 1}
                    />
                </div>
            )}
            
        </div>
    );
};

export default CommentItem;