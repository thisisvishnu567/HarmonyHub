import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Firebase's sign-out function
      localStorage.removeItem("userToken");
      localStorage.removeItem("userInfo");
      navigate("/login"); // Redirect to login
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AppBar position="static" sx={{ top: 0 }}>
      <Toolbar sx={{ justifyContent: "space-between", backgroundColor: "#FF4500" }}>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            HARMONY HUB
          </Typography>
        </Link>
        <Box>
          {user ? (
            <>
              <Link to="/forum" style={{ textDecoration: 'none' }}>
                <Button sx={{ color: 'white' }}>Forum</Button>
              </Link>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "white" }}>Profile</Button>
              </Link>
              <Button sx={{ color: "white" }} onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "white" }}>Login</Button>
              </Link>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "white" }}>Register</Button>
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
