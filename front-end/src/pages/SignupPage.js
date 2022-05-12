import React, { useContext, useEffect, useRef, useState } from "react";
import "./signupPage.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import validator from "validator";
import { Tooltip } from "@mui/material";
import axios from "axios";
import SnackbarComponent from "../components/SnackbarComponent";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import userContext from "../context/userContext/UserContext";
import utils from "../utils";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cPasswordError, setCPasswordError] = useState(false);

  const [disableSignUp, setDisableSignUp] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const apiUrl = utils.api_url;

  // user context
  const [userState, dispatch] = useContext(userContext);

  const signUp = () => {
    const checkUserName = validator.isAlphanumeric(username);
    if (!checkUserName) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
      if (!validator.isStrongPassword(password)) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
      if (!(password === cPassword)) {
        setCPasswordError(true);
      } else {
        setCPasswordError(false);
        signUpCall();
      }
    }
  };

  const signUpCall = async () => {
    setError(false);
    if (usernameError || passwordError || cPasswordError) {
      // no call to api
    } else {
      setDisableSignUp(true);
      const data = {
        username,
        password,
      };
      try {
        const response = await axios.post(apiUrl + "/api/auth/sign-up", data);
        console.log(response);
        if (response.data.message === "username exists") {
          setError(true);
        } else if (response.status === 201) {
          const user = response.data;
          localStorage.setItem("username", user.username);
          dispatch({ type: "VALID-USER" });
          navigate("/home");
        }
        setDisableSignUp(false);
      } catch (error) {
        console.log(">>>", error.message);
        setDisableSignUp(false);
      }
    }
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setCPassword("");
  };

  const passwordRef = useRef();
  const cPasswordRef = useRef();
  const [toggleShowPassword, setToggleShowPassword] = useState(true);
  const [toggleShowCPassword, setToggleShowCPassword] = useState(true);

  const showPassword = (ref) => {
    if (ref === passwordRef) {
      if (toggleShowPassword) {
        ref.current.childNodes[1].childNodes[0].type = "text";
        setToggleShowPassword(false);
      } else {
        ref.current.childNodes[1].childNodes[0].type = "password";
        setToggleShowPassword(true);
      }
    } else {
      if (toggleShowCPassword) {
        ref.current.childNodes[1].childNodes[0].type = "text";
        setToggleShowCPassword(false);
      } else {
        ref.current.childNodes[1].childNodes[0].type = "password";
        setToggleShowCPassword(true);
      }
    }
  };

  return (
    <>
      <div className="signup__container">
        <div className="signup__container-block block1">
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
                  title="username should be alpha-numeric"
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

                <div className="signup__container-input1">
                  <Tooltip
                    disableFocusListener
                    title="provide a strong password (use upper and lower cases with digits and special characters, min 8 characters)"
                    placement="right-start"
                  >
                    <TextField
                      ref={passwordRef}
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
                  <span
                    className="visibility__icon"
                    onClick={() => {
                      showPassword(passwordRef);
                    }}
                  >
                    {toggleShowPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </span>
                </div>

                <div className="signup__container-input2">
                  <Tooltip
                    disableFocusListener
                    title="password should match"
                    placement="right-start"
                  >
                    <TextField
                      ref={cPasswordRef}
                      error={cPasswordError}
                      type={"password"}
                      value={cPassword}
                      onChange={(e) => setCPassword(e.target.value)}
                      fullWidth={true}
                      id="outlined-basic"
                      label="confirm password"
                      variant="outlined"
                    />
                  </Tooltip>
                  <span
                    className="visibility__icon"
                    onClick={() => {
                      showPassword(cPasswordRef);
                    }}
                  >
                    {toggleShowCPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </span>
                </div>
              </Box>

              <Stack
                className="signup__container-formBodyButtons"
                spacing={2}
                direction="row"
              >
                <Button
                  disabled={disableSignUp}
                  onClick={signUp}
                  variant="contained"
                >
                  Create
                </Button>
                <Button onClick={resetForm} variant="text">
                  Reset
                </Button>
              </Stack>
            </div>
            <div className="signup__container-footer">
              <p>
                already have an account{" "}
                <Link className="link" to="/log-in">
                  log in
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="signup__container-block block2">
          <img src="/resources/fox.png" alt="" />
          <span>Foxconn private limited.</span>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit,
            nostrum?
          </p>
          <p>
            <a href="">Know more</a> about us
          </p>
        </div>
      </div>
      {error && (
        <SnackbarComponent
          handle={true}
          message={"username already exists"}
          type={"error"}
        />
      )}
    </>
  );
}

export default SignupPage;
