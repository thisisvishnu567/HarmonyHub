import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { auth } from "../firebase/config";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import { Box, Typography, TextField, Button, Paper, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setDisplayName(user.displayName || "");
        setNewDisplayName(user.displayName || "");
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleUpdateProfile = async () => {
    if (newDisplayName !== displayName) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: newDisplayName,
        });
        setDisplayName(newDisplayName);
        setSuccessMessage(true);
        setError(null);
      } catch (err) {
        setError("Failed to update profile");
      }
    }
  };

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  if (!currentUser) {
    return <Typography>Loading...</Typography>; // Loading state while fetching user data
  }

  return (
    <>
      {/* <Navbar user={currentUser} /> */}
      <Box sx={{ padding: "20px", marginTop: "70px", width: "100%" }}>
        <Paper sx={{ padding: "20px", borderRadius: "8px", boxShadow: 3 }}>
          <Typography
            variant="h4"
            sx={{ marginBottom: "20px", fontWeight: "bold", textAlign: "center" }}
          >
            Profile Settings
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <Avatar sx={{ width: 80, height: 80, fontSize: "2rem" }}>
              {displayName?.[0]?.toUpperCase()}
            </Avatar>
          </Box>

          <Typography variant="h5" sx={{ textAlign: "center", marginBottom: "20px" }}>
            {displayName}
          </Typography>

          <Typography variant="body1" sx={{ marginBottom: "10px", textAlign: "center" }}>
            Email: {currentUser.email}
          </Typography>

          <TextField
            label="Display Name"
            variant="outlined"
            fullWidth
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />

          {error && (
            <Typography variant="body2" color="error" sx={{ marginBottom: "10px" }}>
              {error}
            </Typography>
          )}

          {successMessage && (
            <Typography variant="body2" color="success" sx={{ marginBottom: "20px" }}>
              Profile updated successfully!
            </Typography>
          )}

          <Button
            variant="contained"
            sx={{ backgroundColor: "#FF4500", color: "white", marginRight: "10px" }}
            onClick={handleUpdateProfile}
          >
            Update Profile
          </Button>

          <Button
            variant="outlined"
            sx={{ marginTop: "10px" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default Profile;
