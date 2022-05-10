import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import userContext from "../context/userContext/UserContext";
import config from "../utils";

axios.defaults.withCredentials = true;

function useAuth() {
  // user context
  const [userState, dispatch] = useContext(userContext);
  const [error, setError] = useState(null);

  const apiUrl = config.api_url;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      await axios.get(apiUrl + "/api/auth/get-user");
      dispatch({ type: "VALID-USER" });
    } catch (error) {
      setError(error.response);
    }
  };

  return [userState, error];
}

export default useAuth;
