import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import "./notFound.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notFound__container">
      <ErrorIcon className="notFound__container-icon" />
      <div className="notFound__container-detail">
        <Typography variant="h3">404 error</Typography>
        <Typography variant="h5">Sorry, page not found :(</Typography>
        <Link to="/log-in">Back to login</Link>
      </div>
    </div>
  );
}

export default NotFound;
