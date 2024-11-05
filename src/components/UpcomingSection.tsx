// src/components/UpcomingSection.tsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "../styles/Comment.scss";

interface UpcomingSectionProps {
  isAuthenticated: boolean;
}

const UpcomingSection: React.FC<UpcomingSectionProps> = ({
  isAuthenticated,
}) => {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "comments"), (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="upcoming-section">
      <div className="event-block">
        <h2>Upcoming Event: Tech Innovators Summit 2024</h2>
        <p>
          <strong>Date:</strong> March 15-16, 2025
        </p>
        <p>
          <strong>Location:</strong> Silicon Valley Convention Center,
          California, USA
        </p>
        <p>
          Join us for the Tech Innovators Summit 2024, a premier event that
          brings together industry leaders, visionaries, and tech enthusiasts
          from around the globe. This two-day summit will feature keynote
          speakers, panel discussions, and networking opportunities that will
          ignite ideas and inspire innovation.
        </p>
      </div>
      {isAuthenticated ? (
        <CommentForm parentId="root" />
      ) : (
        <p>Please log in to add a comment.</p>
      )}
      <h3>Comments</h3>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          commentId={comment.id}
          text={comment.text}
          level={1}
          isAuthenticated={isAuthenticated}
        />
      ))}
    </div>
  );
};

export default UpcomingSection;
