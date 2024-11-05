// src/components/Comment.tsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import CommentForm from './CommentForm';
import '../styles/Comment.scss';

interface CommentProps {
    commentId: string;
    text: string;
    level: number;
    isAuthenticated: boolean;
}

const Comment: React.FC<CommentProps> = ({ commentId, text, level, isAuthenticated }) => {
    const [replies, setReplies] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, `comments/${commentId}/replies`), (snapshot) => {
            const repliesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setReplies(repliesData);
        });
        return () => unsubscribe();
    }, [commentId]);

    return (
        <div className={`comment level-${level}`}>
            <p>{text}</p>
            {/* Render CommentForm only if authenticated and level is less than 4 */}
            {isAuthenticated && level < 4 && <CommentForm parentId={commentId} />}
            {replies.length > 0 && (
                <div className="replies">
                    {replies.map((reply) => (
                        <Comment 
                            key={reply.id} 
                            commentId={reply.id} 
                            text={reply.text} 
                            level={level + 1} 
                            isAuthenticated={isAuthenticated} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment;
