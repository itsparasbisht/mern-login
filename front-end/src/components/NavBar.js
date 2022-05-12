import React, { useEffect, useState } from "react";
import "./navBar.css";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SnackbarComponent from "./SnackbarComponent";
import utils from "../utils";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

function NavBar() {
  const [username, setUsername] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("false");
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  const handleLogout = async () => {
    setError(false);
    try {
      const response = await axios.get(utils.api_url + "/api/auth/log-out");
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
          <Tooltip
            title={
              <Typography variant="subtitle2" fontSize="13px">
                {"logged in as " + username}
              </Typography>
            }
            followCursor
          >
            <Avatar
              sx={{
                width: "40px",
                height: "40px",
                bgcolor: "black",
                cursor: "pointer",
              }}
            >
              {username && username[0]?.toUpperCase()}
            </Avatar>
          </Tooltip>
          <Button
            sx={{ textTransform: "capitalize" }}
            onClick={handleLogout}
            variant="outlined"
            color="secondary"
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
