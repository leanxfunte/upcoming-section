// src/components/CommentForm.tsx
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, doc } from "firebase/firestore";
import "../styles/CommentForm.scss";

interface CommentFormProps {
  parentId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ parentId }) => {
  const [text, setText] = useState("");
  const [isVisible, setIsVisible] = useState(false); // State to manage visibility

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim()) {
      if (parentId === "root") {
        // Add a main comment to the 'comments' collection
        await addDoc(collection(db, "comments"), {
          text: text,
        });
      } else {
        // Add a reply to the 'replies' subcollection of the specified parent comment
        const parentCommentRef = doc(db, "comments", parentId);
        await addDoc(collection(parentCommentRef, "replies"), {
          text: text,
        });
      }
      setText(""); // Clear the input field
      setIsVisible(false); // Hide the input after submission
    }
  };

  // Determine the class name based on parentId
  const formClassName = parentId === "root" ? "main-comment" : "reply-comment";

  return (
    <div className="button-block">
      {isVisible ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            className={`${formClassName}-input`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <button type="submit">
            {parentId === "root" ? "Submit" : "Reply"}
          </button>
        </form>
      ) : (
        <div>
          <button
            className={parentId === "root" ? "submit-button" : "reply-button"}
            onClick={() => setIsVisible(true)}
          >
            {parentId === "root" ? "Submit a Comment" : "Reply"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
