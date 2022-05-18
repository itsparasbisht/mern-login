import { Typography, Button } from "@mui/material";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import styles from "./fileUploader.module.css";
import axios from "axios";
import utils from "../utils";

function FileUploader() {
  const [file, setFile] = useState(null);

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file[0]);

    const response = await axios.post(
      utils.api_url + `/api/file/process`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
  };

  return (
    <>
      <Dropzone
        onDrop={(acceptedFile) => {
          setFile(acceptedFile);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div className={styles.container} {...getRootProps()}>
              <input className={styles.inputIcon} {...getInputProps()} />
              <Typography variant="subtitle2" color="black">
                Drag 'n' drop some file here, or click to select a file
              </Typography>
            </div>
          </section>
        )}
      </Dropzone>
      <div className={styles.buttons}>
        <Button variant="contained" onClick={handleFileUpload}>
          Upload
        </Button>
      </div>
    </>
  );
}

export default FileUploader;
