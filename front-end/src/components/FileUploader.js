import { Typography, Button } from "@mui/material";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import styles from "./fileUploader.module.css";
import axios from "axios";
import utils from "../utils";

function FileUploader() {
  const [file, setFile] = useState(null);

  const handleFileUpload = async () => {
    const theFile = file[0];
    axios.post(utils.api_url + `/api/file/process`, theFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  };

  // const handleFileUpload = async () => {
  //   const fileReader = new FileReader();
  //   const theFile = file[0];
  // fileReader.onload = async (e) => {
  //   const CHUNK_SIZE = 1000000; //bytes
  //   const chunkCount = e.target.result.byteLength / CHUNK_SIZE;

  //   console.log("read successfully");
  //   const fileName = Math.random() * 1000 + theFile.name;

  //   for (let chunkId = 0; chunkId < chunkCount + 1; chunkId++) {
  //     const chunk = e.target.result.slice(
  //       chunkId * CHUNK_SIZE,
  //       chunkId * CHUNK_SIZE + CHUNK_SIZE
  //     );

  //     await axios.post(utils.api_url + `/api/file/process`, chunk, {
  //       headers: {
  //         // "content-type": "application/octet-stream",
  //         "file-name": fileName,
  //       },
  //     });
  //   }
  // };
  // fileReader.addEventListener("progress", (e) => {
  //   console.log(e);
  // });
  // fileReader.readAsArrayBuffer(theFile);
  // };

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
