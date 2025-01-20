import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ user }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    if (!title || !content) {
      alert("Please fill out all fields!");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        author: user?.displayName || "Anonymous",
        createdAt: serverTimestamp(),
      });

      // Redirect to Home after post creation
      navigate("/", { state: { message: "Post created successfully!" } });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <Navbar user={user} />
      <Box sx={{ padding: "20px", marginTop: "70px" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
          Create a New Post
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
        <Button
          onClick={handleCreatePost}
          variant="contained"
          sx={{ backgroundColor: "#FF4500", color: "white" }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default CreatePost;
