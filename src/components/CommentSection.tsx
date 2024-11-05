// src/components/CommentSection.tsx
import React, { useState } from 'react';

// Define the CommentType interface
interface CommentType {
    id: string;
    text: string;
    replies: CommentType[]; // Nested replies of the same type
}

const CommentSection: React.FC = () => {
    const [comments, setComments] = useState<CommentType[]>([
        { id: '1', text: 'First comment!', replies: [] },
        { id: '2', text: 'Second comment!', replies: [] }
    ]);

    // Add other logic for rendering comments and handling replies here

    return (
        <div>
            <h3>Comments</h3>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        {comment.text}
                        {/* Render replies here if needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentSection;
