// Post.js
import { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const Post = ({ post }) => {
  const [votes, setVotes] = useState(post.votes || 0);

  const handleUpvote = async () => {
    try {
      const postRef = doc(db, "posts", post.id); // Reference to the specific post
      await updateDoc(postRef, { votes: votes + 1 }); // Update votes in Firestore
      setVotes(votes + 1);
    } catch (error) {
      console.error("Error updating votes:", error);
    }
  };

  const handleDownvote = async () => {
    try {
      const postRef = doc(db, "posts", post.id);
      await updateDoc(postRef, { votes: votes - 1 });
      setVotes(votes - 1);
    } catch (error) {
      console.error("Error updating votes:", error);
    }
  };

  return (
    <Box sx={{ padding: "20px", borderBottom: "1px solid #ddd" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {post.title}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        {post.content}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button onClick={handleUpvote} sx={{ color: "#FF4500" }}>
            ⬆ {votes}
          </Button>
          <Button onClick={handleDownvote} sx={{ color: "#FF4500" }}>
            ⬇
          </Button>
        </Box>
        <Button sx={{ color: "#FF4500" }}>💬 Comments</Button>
        <Button sx={{ color: "#FF4500" }}>🔗 Share</Button>
      </Box>
    </Box>
  );
};

export default Post;
