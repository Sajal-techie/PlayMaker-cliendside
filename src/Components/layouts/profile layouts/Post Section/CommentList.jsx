import React, { useState } from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ comments, postId, handleReplySubmit, depth=0 }) => {
    const [visibleCount, setVisibleCount] = useState(3);
    
    const showMoreComments = () => {
        setVisibleCount(prevCount => prevCount + 3);
    };

    return (
        <div className="">
            {comments.slice(0, visibleCount).map(comment => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    postId={postId}
                    handleReplySubmit={handleReplySubmit}
                    depth={depth}
                />
            ))}
            {visibleCount < comments.length && (
                <button
                    className="text-sm text-blue-500 mt-2"
                    onClick={showMoreComments}
                >
                    View More Comments
                </button>
            )}
        </div>
    );
};

export default CommentList;