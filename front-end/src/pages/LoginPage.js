import React, { useContext } from "react";
import "./loginPage.css";
import "./signupPage.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import validator from "validator";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SnackbarComponent from "../components/SnackbarComponent";
import userContext from "../context/userContext/UserContext";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [disableLogin, setDisableLogin] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // user context
  const [userState, dispatch] = useContext(userContext);

  const logIn = () => {
    const checkUserName = validator.isAlphanumeric(username);
    if (!checkUserName) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
      if (!validator.isStrongPassword(password)) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
        logInCall();
      }
    }
  };

  const logInCall = async () => {
    setError(false);
    if (usernameError || passwordError) {
      // no call to api
    } else {
      setDisableLogin(true);
      const data = {
        username,
        password,
      };

      try {
        const response = await axios.post(`/api/auth/log-in`, data);
        setDisableLogin(false);
        if (response.status === 200) {
          const user = response.data;
          localStorage.setItem("username", user.username);
          dispatch({ type: "VALID-USER" });
          navigate("/home");
        }
      } catch (error) {
        const errorObj = { ...error };
        setDisableLogin(false);
        setError(true);
        setErrorMessage(errorObj.response.data.message);
      }
    }
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <div className="login__container">
        <div className="signup__container-block block login__form">
          <div className="signup__container-form">
            <div className="signup__container-formHeader">
              <img src="/resources/our-logo.webp" alt="" />
              <span>Foxconn Industries</span>
            </div>
            <div className="signup__container-formBody">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "80%" },
                }}
                noValidate
                autoComplete="off"
                className="signup__container-formBody"
              >
                <Tooltip
                  disableFocusListener
                  title="enter your username"
                  placement="right-start"
                >
                  <TextField
                    error={usernameError}
                    fullWidth={true}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id="outlined-basic"
                    label="username"
                    variant="outlined"
                  />
                </Tooltip>

                <Tooltip
                  disableFocusListener
                  title="enter your password"
                  placement="right-start"
                >
                  <TextField
                    error={passwordError}
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth={true}
                    id="outlined-basic"
                    label="password"
                    variant="outlined"
                  />
                </Tooltip>
              </Box>

              <Stack
                className="signup__container-formBodyButtons"
                spacing={2}
                direction="row"
              >
                <Button
                  disabled={disableLogin}
                  onClick={logIn}
                  variant="contained"
                >
                  Login
                </Button>
                <Button onClick={resetForm} variant="text">
                  Reset
                </Button>
              </Stack>
            </div>
            <div className="signup__container-footer">
              <p>
                <Link className="link" to="/sign-up">
                  sign up
                </Link>{" "}
                to create an account
              </p>
            </div>
          </div>
        </div>
      </div>
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

export default LoginPage;
