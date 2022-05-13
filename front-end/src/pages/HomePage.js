import React, { useContext } from "react";
import FileUploader from "../components/FileUploader";
import NavBar from "../components/NavBar";
import userContext from "../context/userContext/UserContext";

function HomePage() {
  const [userState, dispatch] = useContext(userContext);

  return (
    <>
      <NavBar />
      <FileUploader />
    </>
  );
}

export default HomePage;
