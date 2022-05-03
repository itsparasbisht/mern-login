import React, { useEffect, useState } from "react";
import "./navBar.css";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SnackbarComponent from "./SnackbarComponent";

function NavBar() {
  const [username, setUsername] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("false");
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/auth/log-out");
      if (response.data.message === "user logged out") {
        navigate("/log-in");
      } else {
        setError(true);
        setErrorMessage("Failed to logout");
      }
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <nav>
        <div>
          <img src="/resources/our-logo.webp" alt="our logo" />
          <span>Foxconn Industries</span>
        </div>

        <p>
          <Typography variant="body1" component="span">
            {username}
          </Typography>
          <Button
            color="primary"
            sx={{ textTransform: "capitalize" }}
            onClick={handleLogout}
          >
            logout
          </Button>
        </p>
      </nav>
      {error && (
        <SnackbarComponent
          handle={true}
          message={errorMessage}
          type={"error"}
        />
      )}
    </>
  );
}

export default NavBar;
