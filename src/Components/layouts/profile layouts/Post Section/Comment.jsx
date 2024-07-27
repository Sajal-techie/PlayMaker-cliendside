import React, { useState } from 'react';
import { showToastMessage } from '../../../common/functions/showToastMessage';
import { baseUrl } from '../../../../api/api';

const Comment = ({ comment, postId, handleReplySubmit,depth=0 }) => {
    const [reply, setReply] = useState('');
    const [showReplyForm, setShowReplyForm] = useState(false);
    
    const handleReplyChange = (e) => {
        setReply(e.target.value);
    };

    const handleReply = async (e) => {
        e.preventDefault();
        if (reply.trim()===''){
            showToastMessage(400, 'Reply cannot be empty')
            return
        }
        if (depth > 10){
            showToastMessage(400,"Comment depth exceded")
        }
        await handleReplySubmit(e,reply, comment.id);
        setReply('');
        setShowReplyForm(false);
    };

    return (
        <div className="flex flex-col mt-2 ml-4">
            <div className="flex items-start">
                <img src={comment.profile_photo ? baseUrl+comment.profile_photo :'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} alt={comment.user} className="w-8 h-8 rounded-full mr-3" />
                <div className="flex-grow min-w-0">
                    <div className="bg-gray-100 p-2 rounded-lg break-words ">
                        <h4 className="font-semibold">{comment.user}</h4>
                        <p className="text-sm">{comment.content}</p>
                    </div>
                    <button
                        className="text-xs text-blue-500 mt-1"
                        onClick={() => setShowReplyForm(!showReplyForm)}
                    >
                        Reply
                    </button>
                    {showReplyForm && (
                        <form onSubmit={handleReply} className="mt-2">
                            <input
                                type="text"
                                value={reply}
                                onChange={handleReplyChange}
                                placeholder="Write a reply..."
                                className="border border-gray-300 rounded-full px-4 py-2 w-full"
                            />
                        </form>
                    )}
                </div>
            </div>
            {/* to show nested comments (limited to nested comments) */}
            {comment.replies && depth <= 10 &&(
                <div className="pl-4 mt-2">
                    {comment.replies.map(reply => (
                        <Comment
                            key={reply.id}
                            comment={reply}
                            postId={postId}
                            handleReplySubmit={handleReplySubmit}
                            depth={depth+1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment;
