import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, updateDoc, doc, arrayUnion, onSnapshot } from "firebase/firestore";
import { Box, Typography, Card, CardContent, IconButton, Button, TextField, List, ListItem, ListItemText } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth"; // Import Firebase Auth

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState(""); // For adding new comment
  const [commentVisible, setCommentVisible] = useState(null); // Track visible comment section for each post
  const [userUpvoted, setUserUpvoted] = useState({}); // Track upvote status for each post
  const [isCommenting, setIsCommenting] = useState({}); // Track comment posting for each post

  useEffect(() => {
    const fetchPosts = () => {
      const postsCollection = collection(db, "posts");

      onSnapshot(postsCollection, (snapshot) => {
        const postList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postList);
      });
    };

    fetchPosts();
  }, []);

  // Handle Upvote functionality (user can upvote only once)
  const handleUpvote = async (postId) => {
    if (!userUpvoted[postId]) {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        upvotes: arrayUnion("userId"), // Replace "userId" with the actual user ID
      });
      setUserUpvoted((prevState) => ({ ...prevState, [postId]: true })); // Update the upvote status
    }
  };

  // Handle Comment Visibility Toggle
  const toggleCommentVisibility = (postId) => {
    setCommentVisible(commentVisible === postId ? null : postId); // Toggle visibility for each post
  };

  // Handle Adding a Comment
  const handleComment = async (postId) => {
    if (newComment.trim() && !isCommenting[postId]) {
      setIsCommenting((prevState) => ({ ...prevState, [postId]: true })); // Prevent duplicate submissions for each post

      const postRef = doc(db, "posts", postId);
      const user = getAuth().currentUser;
      const username = user ? user.displayName : "Anonymous"; // Use logged-in user name or default to 'Anonymous'

      const newCommentObject = { content: newComment, user: username }; // Add the actual username

      try {
        // Use arrayUnion to ensure no duplicates in Firestore
        await updateDoc(postRef, {
          comments: arrayUnion(newCommentObject),
        });

        // Update local state to reflect the new comment without triggering unnecessary re-renders
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? { ...post, comments: [...(post.comments || []), newCommentObject] }
              : post
          )
        );

        setNewComment(""); // Clear the comment input field
      } catch (error) {
        console.error("Error adding comment: ", error);
      } finally {
        setIsCommenting((prevState) => ({ ...prevState, [postId]: false })); // Re-enable commenting for the post
      }
    }
  };

  return (
    <Box sx={{ padding: "20px", marginTop: "30px"}}>
      <Link to="/create-post" style={{ textDecoration: "none" }}>
        <Button sx={{ marginBottom: "20px", backgroundColor: "#FF4500", color: "white" }}>
          Create Post
        </Button>
      </Link>

      {posts.map((post) => (
        <Card key={post.id} sx={{ marginBottom: "20px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {post.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginBottom: "10px" }}>
              {post.content}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <IconButton onClick={() => handleUpvote(post.id)} sx={{ color: userUpvoted[post.id] ? "green" : "inherit" }}>
                  <ThumbUpAltIcon />
                </IconButton>
                <IconButton onClick={() => toggleCommentVisibility(post.id)}>
                  <ChatBubbleOutlineIcon />
                </IconButton>
                <IconButton>
                  <ShareIcon />
                </IconButton>
              </Box>

              <Typography variant="caption" color="textSecondary">
                {post.author} - {post.createdAt?.seconds
                  ? new Date(post.createdAt.seconds * 1000).toLocaleString()
                  : "Just now"}
              </Typography>
            </Box>

            {commentVisible === post.id && (
              <Box sx={{ marginTop: "10px" }}>
                <Typography variant="body2" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  Comments:
                </Typography>
                <List>
                  {post.comments && post.comments.map((comment, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={comment.user} secondary={comment.content} />
                    </ListItem>
                  ))}
                </List>

                <TextField
                  label="Add a comment"
                  variant="outlined"
                  fullWidth
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  sx={{ marginBottom: "10px" }}
                />
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#FF4500", color: "white" }}
                  onClick={() => handleComment(post.id)}
                  disabled={isCommenting[post.id]} // Prevent re-click while posting
                >
                  Post Comment
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Home;
