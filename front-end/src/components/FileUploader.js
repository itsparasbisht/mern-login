import { Typography } from "@mui/material";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import styles from "./fileUploader.module.css";

function FileUploader() {
  const [file, setFile] = useState([]);
  console.log("%cuploaded files", "color: red; background-color: yellow", file);

  return (
    <Dropzone
      onDrop={(acceptedFiles) => {
        setFile(file.concat(acceptedFiles));
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div className={styles.container} {...getRootProps()}>
            <input className={styles.inputIcon} {...getInputProps()} />
            <Typography variant="subtitle2" color="black">
              Drag 'n' drop some files here, or click to select files
            </Typography>
          </div>
        </section>
      )}
    </Dropzone>
  );
}

export default FileUploader;
