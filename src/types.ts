// src/types.ts
export interface CommentType {
    id: string;
    text: string;
    replies: CommentType[];
    level: number; // Add level to track the depth of the comment
}
